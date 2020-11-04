import React  from 'react'
import * as actionTypes from '../../store/actions'
import Burger from 'components/Burger/Burger'
import BuildControls from 'components/Burger/BuildControls/BuildControls'
import Modal from 'components/UI/Modal/Modal'
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary'
import axios from 'axios-orders'
import Spinner from 'components/UI/Spinner/Spinner'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { BurgerBuilderStateType, DisableInfoType, IngredientsType } from 'utils/types'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

interface BurgerBuilderProps {
	history: RouteComponentProps['history']
}

class BurgerBuilder extends React.Component<BurgerBuilderProps> {
	state: BurgerBuilderStateType = {
		purchasing: false,
		loading: false,
		error: null
	}

	componentDidMount() {
		// axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
		// 		.then(response => {
		// 			this.setState({ ingredients: response.data })
		// 		})
		// 		.catch(error => {
		// 			this.setState({ error: error })
		// 		})
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
		const { purchasing, loading, error } = this.state
		// @ts-ignore
		const { ingredients, onIngredientAdded, onIngredientRemoved, price } = this.props

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

		if (loading) {
			orderSummary = <Spinner />
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

// @ts-ignore
const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		price: state.totalPrice,
	}
}

// @ts-ignore
const mapDispatchToProps = dispatch => {
	return {
		// @ts-ignore
		onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
		// @ts-ignore
		onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
