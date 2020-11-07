import { IngredientsType } from '../utils/types'

export interface InitialStateType {
	ingredients: IngredientsType,
	totalPrice: number,
}

export const initialState: InitialStateType = {
	ingredients: {
		salad: 0,
		meat: 0,
		cheese: 0,
		bacon: 0,
	},
	totalPrice: 4,
}
