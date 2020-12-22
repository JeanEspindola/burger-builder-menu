import { IngredientsType } from '../utils/types'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { RootStateType } from './rootTypes'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
import thunk from 'redux-thunk'
import allSagas from './rootSaga'

export interface InitialStateType {
	ingredients: IngredientsType,
	totalPrice: number,
	error: boolean,
}

// @ts-ignore
export function configureStore(): Store<RootStateType> {
	const composeEnhancers = process.env.NODE_ENV === 'development'
			// @ts-ignore
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: compose;

	const sagaMiddleware = createSagaMiddleware()

	const store = createStore(rootReducer, composeEnhancers(
			applyMiddleware(thunk, sagaMiddleware),
	));

	allSagas.map(saga => sagaMiddleware.run(saga));

	return store
}
