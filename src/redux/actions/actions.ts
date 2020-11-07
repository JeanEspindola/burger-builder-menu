import { IngredientsEnum } from '../../utils/constants'
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actionTypes'

export const addIngredient = (ingredientName: IngredientsEnum) => {
	return {
		type: ADD_INGREDIENT,
		ingredient: ingredientName,
	}
}

export const removeIngredient = (ingredientName: IngredientsEnum) => {
	return {
		type: REMOVE_INGREDIENT,
		ingredient: ingredientName,
	}
}
