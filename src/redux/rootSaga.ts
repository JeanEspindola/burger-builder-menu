import { authWatcher } from './sagas/authSagas'
import { orderWatcher } from './sagas/orderSagas'
import { burgerBuilderWatcher } from './sagas/burgerBuilderSagas'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	authWatcher,
	orderWatcher,
	burgerBuilderWatcher,
]
