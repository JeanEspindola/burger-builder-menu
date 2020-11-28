import { IngredientsType } from '../utils/types'
import { Action, Dispatch as ReduxDispatch } from 'redux'
import { OrderType } from '../containers/Orders/ordersType'

export interface AuthState {
	token: string
	userId: string
	error: string
	loading: boolean
	authRedirectPath: string
	authInitialized: boolean
}

export interface OrderState {
	loading: boolean
	orders: OrderType[]
	purchased: boolean
}

export interface BurgerBuilderState {
	error: boolean
	totalPrice: number
	ingredients: IngredientsType
	building: boolean
}

export interface RootStateType {
	burgerBuilder: BurgerBuilderState,
	order: OrderState,
	auth: AuthState,
}

export type Dispatch = ReduxDispatch<Action>
