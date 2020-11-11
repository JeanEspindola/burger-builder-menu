import { BurgerBuilderState } from './reducers/burgerBuilderReducer'
import { OrderState } from './reducers/orderReducer'

export interface AuthState {
	token: string
	userId: string
	error: string
	loading: boolean
}

export interface RootStateTypes {
	burgerBuilder: BurgerBuilderState,
	order: OrderState,
	auth: AuthState,
}
