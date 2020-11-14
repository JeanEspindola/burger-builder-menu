import React  from 'react'
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
import { Dispatch, RootStateTypes } from '../../redux/rootTypes'
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

interface BurgerBuilderStateType {
	purchasing: boolean,
}

class BurgerBuilder extends React.Component<BurgerBuilderProps> {
	state: Readonly<BurgerBuilderStateType> = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	updatePurchaseState = (ingredients: IngredientsType) => {
		const sum = Object.keys(ingredients)
				.map(igKey => {
					return ingredients[igKey]
				})
				.reduce((sum, el) => sum + el, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		const { isAuthenticated, history, onSetAuthRedirectPath } = this.props
		if (isAuthenticated) {
			this.setState({ purchasing: true })
		} else {
			onSetAuthRedirectPath('/checkout')
			history.push('/auth')
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const { history, onInitPurchase } = this.props
		onInitPurchase()
		history.push('/checkout')
	}

	render () {
		const { purchasing } = this.state

		const { ingredients, onIngredientAdded, onIngredientRemoved, price , error, isAuthenticated } = this.props

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
								ordered={this.purchaseHandler}
								purchasable={this.updatePurchaseState(ingredients)}
								isAuth={isAuthenticated}
						/>
					</React.Fragment>
			)

			orderSummary = <OrderSummary
					ingredients={ingredients}
					price={price}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
			/>
		}

		return (
				<React.Fragment>
					<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
						{orderSummary}
					</Modal>
					{burger}
				</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootStateTypes): Props => ({
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
