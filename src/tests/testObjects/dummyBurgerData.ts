import { BurgerBuilderState } from 'redux/rootTypes'
import { IngredientsType } from 'utils/types'

export const dummyBurgerBuilderState: BurgerBuilderState = {
	building: false,
	ingredients: {},
	error: false,
	totalPrice: 4,
}

export const dummyEmptyIngredients: IngredientsType = {
	salad: 0,
	cheese: 0,
	meat: 0,
	bacon: 0,
}
