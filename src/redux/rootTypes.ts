import { IngredientsType } from '../utils/types'

export interface AuthState {
	token: string
	userId: string
	error: string
	loading: boolean
}

export interface OrderState {
	loading: boolean
	orders: []
	purchased: boolean
}

export interface BurgerBuilderState {
	error: boolean
	totalPrice: number
	ingredients: IngredientsType
}

export interface RootStateTypes {
	burgerBuilder: BurgerBuilderState,
	order: OrderState,
	auth: AuthState,
}
