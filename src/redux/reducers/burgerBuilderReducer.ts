import { AnyAction } from 'redux'
import { IngredientsType } from 'utils/types'
import { BurgerActionTypes } from '../actions/actionTypes'
import { BurgerBuilderState } from '../rootTypes'

export const INGREDIENT_PRICES: IngredientsType = {
	breadTop: 0,
	breadBottom: 0,
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

export const initialState: BurgerBuilderState = {
	ingredients: {},
	totalPrice: 4,
	error: false,
	building: false,
}

const burgerBuilderReducer = (state = initialState, action: AnyAction): BurgerBuilderState => {
	switch (action.type) {
		case BurgerActionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1,
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
				building: true,
			}
		case BurgerActionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
				building: true,
			}
		case BurgerActionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				totalPrice: 4,
				error: false,
				building: false,
			}
		case BurgerActionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true,
			}
		default:
			return state
	}
}

export default burgerBuilderReducer
