import { AnyAction } from 'redux'
import { IngredientsType } from '../../utils/types'
import { ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, REMOVE_INGREDIENT, SET_INGREDIENTS } from '../actions/actionTypes'

const INGREDIENT_PRICES: IngredientsType = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

export interface BurgerBuilderState {
	error: boolean
	totalPrice: number
	ingredients: IngredientsType
}

export const initialState: BurgerBuilderState = {
	ingredients: {},
	totalPrice: 4,
	error: false,
}

const burgerBuilderReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
			}
		case REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
			}
		case SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				error: false,
			}
		case FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			}
		default:
			return state
	}
}

export default burgerBuilderReducer
