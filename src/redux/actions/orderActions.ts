import { PurchaseActionTypes, OrdersActionTypes } from './actionTypes'
import axios from '../../axios-orders'
import { Dispatch } from 'redux'
import { OrderType } from '../../containers/Orders/ordersType'

export const purchaseBurgerSuccess = (id: string, orderData: OrderType) => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
	orderId: id,
	orderData: orderData,
})

export const purchaseBurgerFail = (error: boolean) => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
	error: error,
})

export const purchaseBurgerStart = () => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData: OrderType, token: string) => {
	return (dispatch: Dispatch) => {
		dispatch(purchaseBurgerStart())
		axios.post(`/orders.json?auth=${token}`, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error))
			})
	}
}

export const purchaseInit = () => ({
	type: PurchaseActionTypes.PURCHASE_INIT,
})

export const fetchOrdersSuccess = (orders: OrderType[]) => ({
	type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
	orders: orders,
})

export const fetchOrdersFail = (error: boolean) => ({
	type: OrdersActionTypes.FETCH_ORDERS_FAIL,
	error: error,
})

export const fetchOrdersStart = () => ({
	type: OrdersActionTypes.FETCH_ORDERS_START,
})

export const fetchOrders = (token: string) => {
	return (dispatch: Dispatch) => {
		dispatch(fetchOrdersStart())
		axios.get(`/orders.json?auth=${token}`)
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
