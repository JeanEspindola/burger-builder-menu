import { IngredientsEnum } from '../../utils/constants'
import { BurgerActionTypes } from './actionTypes'
import { IngredientsType } from '../../utils/types'

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

export const fetchIngredients = () => ({
	type: BurgerActionTypes.INIT_INGREDIENTS,
})
