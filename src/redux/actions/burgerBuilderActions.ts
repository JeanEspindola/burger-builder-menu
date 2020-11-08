import { BASE_URL, INGREDIENTS_URL, IngredientsEnum } from '../../utils/constants'
import axios from '../../axios-orders'
import { ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, REMOVE_INGREDIENT, SET_INGREDIENTS } from './actionTypes'
import { Dispatch, IngredientsType } from '../../utils/types'

export const addIngredient = (ingredientName: IngredientsEnum) => ({
	type: ADD_INGREDIENT,
	ingredient: ingredientName,
})

export const removeIngredient = (ingredientName: IngredientsEnum) => ({
	type: REMOVE_INGREDIENT,
	ingredient: ingredientName,
})

export const setIngredients = (ingredients: IngredientsType) => ({
	type: SET_INGREDIENTS,
	ingredients: ingredients,
})

export const fetchIngredientsFailed = () => ({
	type: FETCH_INGREDIENTS_FAILED,
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
