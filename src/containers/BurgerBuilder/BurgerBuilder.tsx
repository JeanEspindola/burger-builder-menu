import React  from 'react'
import * as actionTypes from '../../store/actions'
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
import { AxiosError } from 'axios'
import { InitialStateType } from '../../store/reducer'
import { IngredientsEnum } from '../../utils/constants'

interface BurgerBuilderProps {
	history: RouteComponentProps['history']
	ingredients: IngredientsType
	onIngredientAdded: (type: IngredientsEnum) => void
	onIngredientRemoved: (type: IngredientsEnum) => void
	price: number
}

interface BurgerBuilderStateType {
	purchasing: boolean,
	loading: boolean,
	error: AxiosError | null,
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

const mapStateToProps = (state: InitialStateType) => {
	return {
		ingredients: state.ingredients,
		price: state.totalPrice,
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		onIngredientAdded: (ingredientName: IngredientsEnum) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
		onIngredientRemoved: (ingredientName: IngredientsEnum) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
