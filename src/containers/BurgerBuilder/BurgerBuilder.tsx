import React  from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import { BASE_URL, INGREDIENTS_URL, IngredientsEnum } from '../../utils/constants'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { BurgerBuilderStateType, DisableInfoType, IngredientsType } from '../../utils/types'
import { RouteComponentProps } from 'react-router-dom'

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

interface BurgerBuilderProps {
	history: RouteComponentProps['history']
}

class BurgerBuilder extends React.Component<BurgerBuilderProps> {
	state: BurgerBuilderStateType = {
		ingredients: {},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: null
	}

	componentDidMount() {
		axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
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
		const { ingredients, totalPrice } = this.state
		const { history } = this.props
		const queryParams = []
		for (let i in ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]))
		}
		queryParams.push('price=' + totalPrice)

		const queryString = queryParams.join('&')
		history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		})
	}

	addIngredientHandler = (type: IngredientsEnum) => {
		const { ingredients, totalPrice } = this.state

		const oldCount = ingredients[type] || 0
		const updatedCount = oldCount + 1
		const updatedIngredients = {
				...ingredients
		}

		updatedIngredients[type] = updatedCount
		const priceAddition = INGREDIENT_PRICES[type]
		const newPrice = totalPrice + priceAddition

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type: IngredientsEnum) => {
		const { ingredients, totalPrice } = this.state

		const oldCount = ingredients[type] || 0
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = {
			...ingredients
		}

		updatedIngredients[type] = updatedCount
		const priceDeduction = INGREDIENT_PRICES[type]
		const newPrice = totalPrice - priceDeduction

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
