import * as actionTypes from './actions'
import { AnyAction } from 'redux'

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
				}
			}
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					// @ts-ignore
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				}
			}
		default:
			return state
	}
}

export default reducer
