import { AnyAction } from 'redux'
import { IngredientsType } from '../utils/types'
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../redux/actionTypes'

export interface InitialStateType {
	ingredients: IngredientsType,
	totalPrice: number,
	// purchasable: boolean,
}

const INGREDIENT_PRICES = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

const initialState: InitialStateType = {
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
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1,
				},
				// @ts-ignore
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
			}
		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1,
				},
				// @ts-ignore
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
			}
		default:
			return state
	}
}

export default reducer
