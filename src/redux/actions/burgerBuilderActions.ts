import { BASE_URL, INGREDIENTS_URL, IngredientsEnum } from '../../utils/constants'
import axios from '../../axios-orders'
import { BurgerActionTypes } from './actionTypes'
import { IngredientsType } from '../../utils/types'
import { Dispatch } from '../rootTypes'

export const addIngredient = (ingredientName: IngredientsEnum) => ({
	type: BurgerActionTypes.ADD_INGREDIENT,
	ingredient: ingredientName,
})

export const removeIngredient = (ingredientName: IngredientsEnum) => ({
	type: BurgerActionTypes.REMOVE_INGREDIENT,
	ingredient: ingredientName,
})

export const setIngredients = (ingredients: IngredientsType) => ({
	type: BurgerActionTypes.SET_INGREDIENTS,
	ingredients: ingredients,
})

export const fetchIngredientsFailed = () => ({
	type: BurgerActionTypes.FETCH_INGREDIENTS_FAILED,
})

export const fetchIngredients = () => {
	return (dispatch: Dispatch) => {
		axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
			.then(response => {
				dispatch(setIngredients(response.data))
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			})
	}
}
