import { AnyAction } from 'redux'
import { runSaga, SagaIterator } from 'redux-saga'
import { mockApi, TestDispatchType } from 'tests/testUtils'
import API from 'api/api'
import { RootStateType } from '../../rootTypes'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { FetchOrdersType, OrdersActionTypes, PurchaseActionTypes, PurchaseBurgerType } from '../../actions/actionTypes'
import { dummyFetchedOrders, dummyOrder } from 'tests/testObjects/dummyOrderData'
import { fetchOrdersSaga, purchaseBurgerSaga } from '../orderSagas'

jest.mock('api/api');

describe('orderSagas', () => {
	describe('purchaseBurgerSaga', () => {
		const purchaseBurgerAction: PurchaseBurgerType = {
			type: OrdersActionTypes.PURCHASE_BURGER,
			token: 'aaa',
			orderData: {
				...dummyOrder,
			},
		}
		//
		// it('purchaseBurger fails', async () => {
		// 	const action: PurchaseBurgerType = {
		// 		type: OrdersActionTypes.PURCHASE_BURGER,
		// 		token: '',
		// 		orderData: {
		// 			...dummyOrder,
		// 		},
		// 	}
		//
		// 	mockApi(API.setPurchaseBurger, 403, {});
		//
		// 	const dispatched: TestDispatchType<{}>[] = []
		// 	const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
		// 			{
		// 				dispatch: action => dispatched.push(action),
		// 				getState: () => dummyRootAppState()
		// 			},
		// 			() => purchaseBurgerSaga(action),
		// 	)
		//
		// 	await saga.toPromise()
		//
		// 	expect(dispatched).toEqual(
		// 			expect.arrayContaining([
		// 				expect.objectContaining({
		// 					type: PurchaseActionTypes.PURCHASE_BURGER_START,
		// 				}),
		// 				expect.objectContaining({
		// 					type: PurchaseActionTypes.PURCHASE_BURGER_FAIL,
		// 				}),
		// 			]),
		// 	)
		// })

		it('purchaseBurger success', async () => {
			const response = {
				data: {
					name: 'xxx12345',
				}
			}

			mockApi(API.setPurchaseBurger, 200, response);

			const dispatched: TestDispatchType<{}>[] = []
			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					() => purchaseBurgerSaga(purchaseBurgerAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							type: PurchaseActionTypes.PURCHASE_BURGER_START,
						}),
						expect.objectContaining({
							orderData: {
								...dummyOrder,
							},
						}),
						expect.objectContaining({
							type: PurchaseActionTypes.PURCHASE_BURGER_SUCCESS,
						}),
					]),
			)
		})

	})

	describe('fetchOrdersSaga', () => {
		const fetchOrdersAction: FetchOrdersType = {
			type: OrdersActionTypes.FETCH_ORDERS,
			token: 'xxx123',
			userId: '123',
		}

		it('fetchOrders success', async () => {
			const response = {
				data: {
					...dummyFetchedOrders,
				}
			}

			mockApi(API.fetchOrders, 200, response);

			const dispatched: TestDispatchType<{}>[] = []
			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					() => fetchOrdersSaga(fetchOrdersAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: OrdersActionTypes.FETCH_ORDERS_START,
					}),
					expect.objectContaining({
						orders: [
							dummyOrder,
						],
					}),
					expect.objectContaining({
						type: OrdersActionTypes.FETCH_ORDERS_SUCCESS,
					}),
				]),
			)
		})

		it('fetchOrders fail', async () => {
			const response = {
				error: 'error',
			}

			mockApi(API.fetchOrders, 403, response);

			const dispatched: TestDispatchType<{}>[] = []
			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					() => fetchOrdersSaga(fetchOrdersAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							type: OrdersActionTypes.FETCH_ORDERS_START,
						}),
						expect.objectContaining({
							type: OrdersActionTypes.FETCH_ORDERS_FAIL,
						}),
					]),
			)
		})
	})
})
