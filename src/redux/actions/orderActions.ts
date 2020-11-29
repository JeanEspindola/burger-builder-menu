import {
	FetchOrdersType,
	FetchOrdersFailType,
	FetchOrdersStartType,
	FetchOrdersSuccessType,
	OrdersActionTypes,
	PurchaseActionTypes,
	PurchaseBurgerType,
	PurchaseBurgerFailType,
	PurchaseBurgerStartType,
	PurchaseBurgerSuccessType,
	PurchaseInitType
} from './actionTypes'
import { OrderType } from '../../containers/Orders/ordersType'

export const purchaseBurgerSuccess = (id: string, orderData: OrderType): PurchaseBurgerSuccessType => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
	orderId: id,
	orderData: orderData,
})

export const purchaseBurgerFail = (error: boolean): PurchaseBurgerFailType => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
	error: error,
})

export const purchaseBurgerStart = (): PurchaseBurgerStartType => ({
	type: PurchaseActionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData: OrderType, token: string): PurchaseBurgerType => ({
	type: OrdersActionTypes.PURCHASE_BURGER,
	orderData,
	token,
})

export const purchaseInit = (): PurchaseInitType => ({
	type: PurchaseActionTypes.PURCHASE_INIT,
})

export const fetchOrdersSuccess = (orders: OrderType[]): FetchOrdersSuccessType => ({
	type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
	orders: orders,
})

export const fetchOrdersFail = (error: boolean): FetchOrdersFailType => ({
	type: OrdersActionTypes.FETCH_ORDERS_FAIL,
	error: error,
})

export const fetchOrdersStart = (): FetchOrdersStartType => ({
	type: OrdersActionTypes.FETCH_ORDERS_START,
})

export const fetchOrders = (token: string, userId: string): FetchOrdersType => ({
	type: OrdersActionTypes.FETCH_ORDERS,
	token,
	userId,
})
