import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { IngredientsEnum } from '../../utils/constants'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

export interface DisableInfoType {
	[key: string]: boolean,
}

export interface IngredientsType {
	[key : string] : number,
}

export interface BurgerBuilderStateType {
	ingredients: IngredientsType,
	totalPrice: number,
	purchasable: boolean,
	purchasing: boolean,
}

class BurgerBuilder extends Component {
	state: BurgerBuilderStateType = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	}

	updatePurchaseState = (ingredients: IngredientsType) => {
		const sum = Object.keys(ingredients)
				.map(igKey => {
					return ingredients[igKey]
				})
				.reduce((sum, el) => sum + el, 0)

		this.setState({ purchasable: sum > 0 })
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		alert('You continue!!')
	}

	addIngredientHandler = (type: IngredientsEnum) => {
		const oldCount = this.state.ingredients[type] || 0
		const updatedCount = oldCount + 1
		const updatedIngredients = {
				...this.state.ingredients
		}

		updatedIngredients[type] = updatedCount
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type: IngredientsEnum) => {
		const oldCount = this.state.ingredients[type] || 0
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = {
			...this.state.ingredients
		}

		updatedIngredients[type] = updatedCount
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients)
	}

	render () {
		const { totalPrice, purchasing, ingredients, purchasable } = this.state

		const disableInfo: DisableInfoType = {}

		for (let key in ingredients) {
			disableInfo[key] = ingredients[key] <= 0
		}
		return (
				<Aux>
					<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
						<OrderSummary
								ingredients={ingredients}
								price={totalPrice}
								purchaseCanceled={this.purchaseCancelHandler}
								purchaseContinued={this.purchaseContinueHandler}
						/>
					</Modal>
					<Burger ingredients={ingredients}/>
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disableInfo}
						price={totalPrice}
						ordered={this.purchaseHandler}
						purchasable={purchasable}
					/>
				</Aux>
		);
	}
}

export default BurgerBuilder