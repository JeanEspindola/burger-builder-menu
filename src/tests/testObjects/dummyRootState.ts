import { RootStateType } from 'redux/rootTypes'
import { dummyAuthState } from './dummyAuthData'
import { dummyBurgerBuilderState } from './dummyBurgerData'
import { dummyOrderState } from './dummyOrderData'

export const dummyRootAppState = () :RootStateType => {
	return {
		auth: dummyAuthState,
		burgerBuilder: dummyBurgerBuilderState,
		order: dummyOrderState,
	}
}
