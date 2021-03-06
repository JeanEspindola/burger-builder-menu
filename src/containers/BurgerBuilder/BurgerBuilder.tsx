import React, { useCallback, useEffect, useState } from 'react'
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import axios from 'axios-orders'
import Spinner from 'components/UI/Spinner/Spinner'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { DisableInfoType, IngredientsType } from 'utils/types'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { IngredientsEnum } from 'utils/constants'
import { addIngredient, removeIngredient, fetchIngredients } from 'redux/actions/burgerBuilderActions'
import { RootStateType } from 'redux/rootTypes'
import { purchaseInit } from 'redux/actions/orderActions'
import { setAuthRedirectPath } from 'redux/actions/authActions'
import { useHistory } from "react-router-dom"

const BurgerBuilder = () => {
	const [purchasing, setIsPurchasing] = useState<boolean>(false)

	const history = useHistory()

	const dispatch = useDispatch()

	const { ingredients, totalPrice, error } = useSelector((state: RootStateType) => state.burgerBuilder)
	const isAuthenticated = useSelector((state: RootStateType) => state.auth.token !== '')

	const onIngredientAdded = (ingredientName: IngredientsEnum) => dispatch(addIngredient(ingredientName))
	const onIngredientRemoved = (ingredientName: IngredientsEnum) => dispatch(removeIngredient(ingredientName))
	const onInitPurchase = () => dispatch(purchaseInit())
	const onSetAuthRedirectPath = (path: string) => dispatch(setAuthRedirectPath(path))
	const onInitIngredients = useCallback(() => dispatch(fetchIngredients()), [dispatch])

	useEffect(() => {
		onInitIngredients()
	}, [onInitIngredients])

	const updatePurchaseState = (ingredients: IngredientsType) => {
		const sum = Object.keys(ingredients)
				.map(igKey => {
					return ingredients[igKey]
				})
				.reduce((sum, el) => sum + el, 0)
		return sum > 0
	}

	const purchaseHandler = () => {
		if (isAuthenticated) {
			setIsPurchasing(true)
		} else {
			onSetAuthRedirectPath('/checkout')
			history.push('/auth')
		}
	}

	const purchaseCancelHandler = () => {
		setIsPurchasing(false)
	}

	const purchaseContinueHandler = () => {
		onInitPurchase()
		history.push('/checkout')
	}

	const disableInfo: DisableInfoType = {}

	for (let key in ingredients) {
		disableInfo[key] = ingredients[key] <= 0
	}

	let orderSummary = null
	let burger = error ? <p><FormattedMessage id="ingredients.error" /></p> : <Spinner />

	if (Object.keys(ingredients).length > 0) {
		burger = (
				<React.Fragment>
					<Burger ingredients={ingredients}/>
					<BuildControls
							ingredientAdded={onIngredientAdded}
							ingredientRemoved={onIngredientRemoved}
							disabled={disableInfo}
							price={totalPrice}
							ordered={purchaseHandler}
							purchasable={updatePurchaseState(ingredients)}
							isAuth={isAuthenticated}
					/>
				</React.Fragment>
		)

		orderSummary = <OrderSummary
				ingredients={ingredients}
				price={totalPrice}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
		/>
	}

	return (
			<React.Fragment>
				{purchasing &&
					<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
						{orderSummary}
					</Modal>
				}
				{burger}
			</React.Fragment>
	);
}

export default withErrorHandler(BurgerBuilder, axios)
