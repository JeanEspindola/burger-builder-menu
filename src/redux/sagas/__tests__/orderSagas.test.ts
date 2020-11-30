import { mockApi, TestDispatchType } from 'tests/testUtils'
import API from '../../../api/api'
import { AnyAction } from 'redux'
import { runSaga, SagaIterator } from 'redux-saga'
import { RootStateType } from '../../rootTypes'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { OrdersActionTypes, PurchaseActionTypes, PurchaseBurgerType } from '../../actions/actionTypes'
import { dummyOrder } from '../../../tests/testObjects/dummyOrderData'
import { purchaseBurgerSaga } from '../orderSagas'

jest.mock('../../../api/api');

describe('orderSagas', () => {
	describe('purchaseBurgerSaga', () => {
		const purchaseBurgerAction: PurchaseBurgerType = {
			type: OrdersActionTypes.PURCHASE_BURGER,
			token: 'aaa',
			orderData: {
				...dummyOrder,
			},
		}

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
})
