import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { IngredientsEnum } from '../../utils/constants'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { BurgerBuilderStateType, DisableInfoType, IngredientsType } from '../../utils/types'

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	state: BurgerBuilderStateType = {
		ingredients: {},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		axios.get('https://react-burger-builder-menu.firebaseio.com/ingredients.json')
				.then(response => {
					this.setState({ ingredients: response.data })
				})
				.catch(error => {
					this.setState({ error: error })
				})
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
		this.setState({ loading: true })
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Jean Espindola',
				address: {
					street: 'Teststrasse 1',
					zipCode: '81735',
					country: 'Germany',
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest',
		}

		axios.post('/orders.json', order)
				.then(response => {
					this.setState({ loading: false, purchasing: false })
				})
				.catch(error => {
					this.setState({ loading: false, purchasing: false })
				})
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
		const { totalPrice, purchasing, ingredients, purchasable, loading, error } = this.state

		const disableInfo: DisableInfoType = {}

		for (let key in ingredients) {
			disableInfo[key] = ingredients[key] <= 0
		}

		let orderSummary = null
		let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

		if (Object.keys(ingredients).length > 0) {
			burger = (
					<Aux>
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
			)

			orderSummary = <OrderSummary
					ingredients={ingredients}
					price={totalPrice}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
			/>
		}

		if (loading) {
			orderSummary = <Spinner />
		}

		return (
				<Aux>
					<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
						{orderSummary}
					</Modal>
					{burger}
				</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios)