import { OrdersActionTypes, PurchaseActionTypes } from '../../actions/actionTypes'
import { orderReducer } from '../orderReducer'
import { dummyOrder, dummyOrders, dummyOrderState } from 'tests/testObjects/dummyOrderData'

describe('orderReducer', () => {
	test('purchaseInit action', () => {
		const tempState = { ...dummyOrderState }
		tempState.purchased = true

		const newState = orderReducer(
				{ ...tempState },
				{
					type: PurchaseActionTypes.PURCHASE_INIT,
				}
		)

		expect(newState.purchased).toBeFalsy()
	})

	test('purchaseBurgerStart action', () => {
		const newState = orderReducer(
				{ ...dummyOrderState },
				{
					type: PurchaseActionTypes.PURCHASE_BURGER_START,
				}
		)

		expect(newState.loading).toBeTruthy()
	})

	test('purchaseBurgerSuccess action', () => {
		const tempState = { ...dummyOrderState }
		tempState.loading = true

		const newState = orderReducer(
				{ ...tempState },
				{
					type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
					orderId: dummyOrder.id,
					orderData: dummyOrder,
				}
		)

		expect(newState.loading).toBeFalsy()
		expect(newState.purchased).toBeTruthy()
		expect(newState.orders).toEqual([ dummyOrder ])
	})

	test('purchaseBurgerFail action', () => {
		const tempState = { ...dummyOrderState }
		tempState.loading = true

		const newState = orderReducer(
				{ ...tempState },
				{
					type: PurchaseActionTypes.PURCHASE_BURGER_FAIL,
				}
		)

		expect(newState.loading).toBeFalsy()
	})

	test('fetchOrdersStart action', () => {
		const newState = orderReducer(
				{ ...dummyOrderState },
				{
					type: OrdersActionTypes.FETCH_ORDERS_START,
				}
		)

		expect(newState.loading).toBeTruthy()
	})

	test('fetchOrdersSuccess action', () => {
		const tempState = { ...dummyOrderState }
		tempState.loading = true

		const newState = orderReducer(
				{ ...tempState },
				{
					type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
					orders: dummyOrders,
				}
		)

		expect(newState.loading).toBeFalsy()
		expect(newState.orders).toEqual(dummyOrders)
	})

	test('fetchOrdersFail action', () => {
		const tempState = { ...dummyOrderState }
		tempState.loading = true

		const newState = orderReducer(
				{ ...tempState },
				{
					type: OrdersActionTypes.FETCH_ORDERS_FAIL,
				}
		)

		expect(newState.loading).toBeFalsy()
	})

	test('returns default state when no action is passed', () => {
		const newState = orderReducer(
				{ ...dummyOrderState },
				{
					type: ''
				},
		)
		expect(newState).toEqual(dummyOrderState)
	})
})
