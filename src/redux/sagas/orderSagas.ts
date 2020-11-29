import { put, call } from '@redux-saga/core/effects';
import {
	fetchOrdersFail,
	fetchOrdersStart,
	fetchOrdersSuccess,
	purchaseBurgerFail,
	purchaseBurgerStart,
	purchaseBurgerSuccess
} from '../actions/orderActions'
import { all, takeEvery } from 'redux-saga/effects'
import { FetchOrdersType, OrdersActionTypes, PurchaseBurgerType } from '../actions/actionTypes'
import API from '../../api/api'
import { getOrdersArray } from '../../utils/helper'

export function* purchaseBurgerSaga(action: PurchaseBurgerType) {
	const { token, orderData } = action

	try {
		yield put(purchaseBurgerStart())
		const response = yield call(API.setPurchaseBurger, token, orderData)
		yield put(purchaseBurgerSuccess(response.data.name, orderData))

	} catch (error) {
		yield put(purchaseBurgerFail(error))
	}
}

export function* fetchOrdersSaga(action: FetchOrdersType) {
	const { userId, token } = action

	try {
		yield put(fetchOrdersStart())
		const response = yield call(API.fetchOrders, token, userId)

		const fetchedOrders = getOrdersArray(response.data)

		yield put(fetchOrdersSuccess(fetchedOrders))

	} catch (error) {
		yield put(fetchOrdersFail(true))
	}
}

export default function* orderWatcher() {
	yield all([
		takeEvery(OrdersActionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
		takeEvery(OrdersActionTypes.FETCH_ORDERS, fetchOrdersSaga),
	])
}
