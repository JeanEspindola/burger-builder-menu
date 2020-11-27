import { OrdersActionTypes, PurchaseActionTypes } from '../actionTypes'
import {
	fetchOrders, fetchOrdersFail, fetchOrdersStart, fetchOrdersSuccess,
	purchaseBurger,
	purchaseBurgerFail,
	purchaseBurgerStart,
	purchaseBurgerSuccess, purchaseInit
} from '../orderActions'
import { dummyOrder, dummyOrders } from '../../../tests/testObjects/dummyOrderData'

describe('ordersAction', () => {
	const orderData = dummyOrder
	const orderId = dummyOrder.id
	it('dispatch purchaseBurgerSuccess', () => {
		expect(purchaseBurgerSuccess(orderId, orderData)).toEqual({
			type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
			orderData,
			orderId,
		});
	})

	it('dispatch purchaseBurgerFail', () => {
		const error = true
		expect(purchaseBurgerFail(error)).toEqual({
			type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
			error,
		});
	})

	it('dispatch purchaseBurgerStart', () => {
		expect(purchaseBurgerStart()).toEqual({
			type: PurchaseActionTypes.PURCHASE_BURGER_START,
		});
	})

	it('dispatch purchaseBurger', () => {
		const orderData = dummyOrder
		const token = 'aaaXXX'
		expect(purchaseBurger(orderData, token)).toEqual({
			type: OrdersActionTypes.PURCHASE_BURGER,
			orderData,
			token,
		});
	})

	it('dispatch purchaseInit', () => {
		expect(purchaseInit()).toEqual({
			type: PurchaseActionTypes.PURCHASE_INIT,
		});
	})

	it('dispatch fetchOrdersSuccess', () => {
		const orders = dummyOrders
		expect(fetchOrdersSuccess(orders)).toEqual({
			type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
			orders,
		});
	})

	it('dispatch fetchOrdersFail', () => {
		const error = true
		expect(fetchOrdersFail(error)).toEqual({
			type: OrdersActionTypes.FETCH_ORDERS_FAIL,
			error,
		});
	})

	it('dispatch fetchOrdersStart', () => {
		expect(fetchOrdersStart()).toEqual({
			type: OrdersActionTypes.FETCH_ORDERS_START,
		});
	})

	it('dispatch fetchOrders', () => {
		const token = 'aaaXXX'
		const userId = 'user123'
		expect(fetchOrders(token, userId)).toEqual({
			type: OrdersActionTypes.FETCH_ORDERS,
			token,
			userId,
		});
	})
})
