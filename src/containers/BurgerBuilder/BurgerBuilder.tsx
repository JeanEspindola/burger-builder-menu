import React  from 'react'
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import axios from 'axios-orders'
import Spinner from 'components/UI/Spinner/Spinner'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { DisableInfoType, Dispatch, IngredientsType } from 'utils/types'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { IngredientsEnum } from '../../utils/constants'
import { addIngredient, removeIngredient, fetchIngredients } from '../../redux/actions/burgerBuilderActions'
import { RootStateTypes } from '../../redux/rootTypes'

interface BurgerBuilderProps {
	history: RouteComponentProps['history']
	ingredients: IngredientsType
	onIngredientAdded: (type: IngredientsEnum) => void
	onIngredientRemoved: (type: IngredientsEnum) => void
	onInitIngredients: () => void
	price: number
	error: boolean
}

interface BurgerBuilderStateType {
	purchasing: boolean,
}

class BurgerBuilder extends React.Component<BurgerBuilderProps> {
	state: BurgerBuilderStateType = {
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
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const { history } = this.props
		history.push('/checkout')
	}

	render () {
		const { purchasing } = this.state

		const { ingredients, onIngredientAdded, onIngredientRemoved, price , error } = this.props

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

const mapStateToProps = (state: RootStateTypes) => ({
	ingredients: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
	onIngredientAdded: (ingredientName: IngredientsEnum) => dispatch(addIngredient(ingredientName)),
	onIngredientRemoved: (ingredientName: IngredientsEnum) => dispatch(removeIngredient(ingredientName)),
	// @ts-ignore
	onInitIngredients: () => dispatch(fetchIngredients()),
})


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
