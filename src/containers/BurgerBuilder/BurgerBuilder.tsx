import React, { useEffect, useState } from 'react'
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import axios from 'axios-orders'
import Spinner from 'components/UI/Spinner/Spinner'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { DisableInfoType, IngredientsType } from 'utils/types'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { IngredientsEnum } from '../../utils/constants'
import { addIngredient, removeIngredient, fetchIngredients } from '../../redux/actions/burgerBuilderActions'
import { Dispatch, RootStateType } from '../../redux/rootTypes'
import { purchaseInit } from '../../redux/actions/orderActions'
import { setAuthRedirectPath } from '../../redux/actions/authActions'

interface Props {
	ingredients: IngredientsType
	price: number
	error: boolean
	isAuthenticated: boolean
}

interface DispatchProps {
	onIngredientAdded: (type: IngredientsEnum) => void
	onIngredientRemoved: (type: IngredientsEnum) => void
	onInitIngredients: () => void
	onInitPurchase: () => void
	onSetAuthRedirectPath: (path: string) => void
}

interface BurgerBuilderProps extends Props, DispatchProps {
	history: RouteComponentProps['history']
}

const BurgerBuilder = (props: BurgerBuilderProps) => {
	const [purchasing, setIsPurchasing] = useState<boolean>(false)

	const { ingredients, onIngredientAdded, onIngredientRemoved, price , error, isAuthenticated, onInitIngredients } = props

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
		const { isAuthenticated, history, onSetAuthRedirectPath } = props
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
		const { history, onInitPurchase } = props
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
							price={price}
							ordered={purchaseHandler}
							purchasable={updatePurchaseState(ingredients)}
							isAuth={isAuthenticated}
					/>
				</React.Fragment>
		)

		orderSummary = <OrderSummary
				ingredients={ingredients}
				price={price}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
		/>
	}

	return (
			<React.Fragment>
				<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
	);
}

const mapStateToProps = (state: RootStateType): Props => ({
	ingredients: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
	isAuthenticated: state.auth.token !== '',
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onIngredientAdded: (ingredientName: IngredientsEnum) => dispatch(addIngredient(ingredientName)),
	onIngredientRemoved: (ingredientName: IngredientsEnum) => dispatch(removeIngredient(ingredientName)),
	onInitPurchase: () => dispatch(purchaseInit()),
	onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
	// @ts-ignore
	onInitIngredients: () => dispatch(fetchIngredients()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
