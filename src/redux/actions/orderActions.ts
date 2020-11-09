import {
	FETCH_ORDERS_FAIL, FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	PURCHASE_BURGER_START,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_INIT
} from './actionTypes'
import axios from '../../axios-orders'
import { Dispatch } from 'redux'

// @ts-ignore
export const purchaseBurgerSuccess = (id, orderData) => ({
	type: PURCHASE_BURGER_SUCCESS,
	orderId: id,
	orderData: orderData,
})

export const purchaseBurgerFail = (error: boolean) => ({
	type: PURCHASE_BURGER_SUCCESS,
	error: error,
})

export const purchaseBurgerStart = () => ({
	type: PURCHASE_BURGER_START
})

// @ts-ignore
export const purchaseBurger = (orderData) => {
	return (dispatch: Dispatch) => {
		dispatch(purchaseBurgerStart())
		axios.post('/orders.json', orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error))
			})
	}
}

export const purchaseInit = () => ({
	type: PURCHASE_INIT,
})

// @ts-ignore
export const fetchOrdersSuccess = (orders) => ({
	type: FETCH_ORDERS_SUCCESS,
	orders: orders,
})

export const fetchOrdersFail = (error: boolean) => ({
	type: FETCH_ORDERS_FAIL,
	error: error,
})

export const fetchOrdersStart = () => ({
	type: FETCH_ORDERS_START,
})

export const fetchOrders = () => {
	return (dispatch: Dispatch) => {
		dispatch(fetchOrdersStart())
		axios.get('/orders.json')
				.then(res => {
					const fetchedOrders = []
					for (let key in res.data) {
						fetchedOrders.push({
							...res.data[key],
							id: key,
						})
					}
					dispatch(fetchOrdersSuccess(fetchedOrders))
				})
				.catch(error => {
					dispatch(fetchOrdersFail(true))
				})
	}
}
