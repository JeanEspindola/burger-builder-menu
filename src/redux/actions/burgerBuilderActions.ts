import { IngredientsEnum } from '../../utils/constants'
import {
	AddIngredientType,
	BurgerActionTypes,
	FetchIngredientsType,
	FetchIngredientsFailedType,
	RemoveIngredientType,
	SetIngredientsType
} from './actionTypes'
import { IngredientsType } from '../../utils/types'

export const addIngredient = (ingredientName: IngredientsEnum): AddIngredientType => ({
	type: BurgerActionTypes.ADD_INGREDIENT,
	ingredient: ingredientName,
})

export const removeIngredient = (ingredientName: IngredientsEnum): RemoveIngredientType => ({
	type: BurgerActionTypes.REMOVE_INGREDIENT,
	ingredient: ingredientName,
})

export const setIngredients = (ingredients: IngredientsType): SetIngredientsType => ({
	type: BurgerActionTypes.SET_INGREDIENTS,
	ingredients: ingredients,
})

export const fetchIngredientsFailed = (): FetchIngredientsFailedType => ({
	type: BurgerActionTypes.FETCH_INGREDIENTS_FAILED,
})

export const fetchIngredients = (): FetchIngredientsType => ({
	type: BurgerActionTypes.INIT_INGREDIENTS,
})
