import { AxiosError } from 'axios'

export interface DisableInfoType {
	[key: string]: boolean,
}

export interface IngredientsType {
	[key: string]: number,
}

export interface BurgerBuilderStateType {
	// ingredients: IngredientsType,
	// totalPrice: number,
	// purchasable: boolean,
	purchasing: boolean,
	loading: boolean,
	error: AxiosError | null,
}

export interface withErrorHandlerStateType {
	error: AxiosError | null
}
