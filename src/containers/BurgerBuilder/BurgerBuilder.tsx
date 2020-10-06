import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { IngredientsEnum } from '../../utils/constants'

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

export interface IngredientsType {
	breadTop?: number,
	salad: number,
	bacon: number,
	cheese: number,
	meat: number,
	breadBottom?: number
}

export interface BurgerBuilderStateType {
	ingredients: IngredientsType,
	totalPrice: number,
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
	}

	render () {
		const disableInfo = {
				...this.state.ingredients
		}

		for (let key in disableInfo) {
			// @ts-ignore
			disableInfo[key] = disableInfo[key] <= 0
		}
		return (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disableInfo}
					/>
				</Aux>
		);
	}
}

export default BurgerBuilder