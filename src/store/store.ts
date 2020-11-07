import { IngredientsType } from '../utils/types'

export interface InitialStateType {
	ingredients: IngredientsType,
	totalPrice: number,
	error: boolean,
}

export const initialState: InitialStateType = {
	ingredients: {},
	totalPrice: 4,
	error: false,
}
