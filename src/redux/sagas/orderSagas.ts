import { put } from '@redux-saga/core/effects';
import axios from '../../axios-orders'
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

export function* purchaseBurgerSaga(action: PurchaseBurgerType) {
	const { token, orderData } = action

	try {
		yield put(purchaseBurgerStart())
		const response = yield axios.post(`/orders.json?auth=${token}`, orderData)
		yield put(purchaseBurgerSuccess(response.data.name, orderData))

	} catch (error) {
		yield put(purchaseBurgerFail(error))
	}
}

export function* fetchOrdersSaga(action: FetchOrdersType) {
	const { userId, token } = action

	try {
		yield put(fetchOrdersStart())
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
		const response = yield axios.get(`/orders.json${queryParams}`)

		const fetchedOrders = []
		for (let key in response.data) {
			fetchedOrders.push({
				...response.data[key],
				id: key,
			})
		}

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
