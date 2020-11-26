import { PurchaseActionTypes, OrdersActionTypes } from './actionTypes'
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

export const purchaseBurger = (orderData: OrderType, token: string) => ({
	type: OrdersActionTypes.PURCHASE_BURGER,
	orderData,
	token,
})

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

export const fetchOrders = (token: string, userId: string) => ({
	type: OrdersActionTypes.FETCH_ORDERS,
	token,
	userId,
})
