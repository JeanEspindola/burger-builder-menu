import * as actionTypes from './actions'
import { AnyAction } from 'redux'

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

const initialState = {
	// TODO: temp
	ingredients: {
		salad: 0,
		meat: 0,
		cheese: 0,
		bacon: 0,
	},
	totalPrice: 4,
}

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					// @ts-ignore
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
				},
				// @ts-ignore
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
			}
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					// @ts-ignore
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				// @ts-ignore
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
			}
		default:
			return state
	}
}

export default reducer
