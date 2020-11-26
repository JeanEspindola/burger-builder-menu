import { takeEvery, all } from 'redux-saga/effects'
import { authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga } from './sagas/authSagas'
import { AuthActionTypes, BurgerActionTypes, OrdersActionTypes } from './actions/actionTypes'
import { initIngredientsSaga } from './sagas/burgerBuilderSagas'
import { fetchOrdersSaga, purchaseBurgerSaga } from './sagas/orderSagas'

export function* watchAuth() {
	yield all([
		takeEvery(AuthActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(AuthActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(AuthActionTypes.AUTH_USER, authUserSaga),
		takeEvery(AuthActionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
	])
}

export function* watchBurgerBuilder() {
	yield takeEvery(BurgerActionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
	yield all([
		takeEvery(OrdersActionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
		takeEvery(OrdersActionTypes.FETCH_ORDERS, fetchOrdersSaga),
	])
}
