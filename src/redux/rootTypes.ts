import { BurgerBuilderState } from './reducers/burgerBuilderReducer'
import { OrderState } from './reducers/orderReducer'

export interface RootStateTypes {
	burgerBuilder: BurgerBuilderState,
	order: OrderState,
}
