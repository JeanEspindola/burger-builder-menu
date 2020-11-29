import { mockApi, TestDispatchType } from 'tests/testUtils'
import { dummyEmptyIngredients } from 'tests/testObjects/dummyBurgerData'
import API from '../../../api/api'
import { AnyAction } from 'redux'
import { runSaga, SagaIterator } from 'redux-saga'
import { RootStateType } from '../../rootTypes'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { initIngredientsSaga } from '../burgerBuilderSagas'
import { BurgerActionTypes } from '../../actions/actionTypes'

jest.mock('../../../api/api');

describe('burgerBuilderSagas', () => {
	it('initIngredientsSaga success', async () => {
		const response = {
			data: {
				...dummyEmptyIngredients,
			}
		}

		mockApi(API.getIngredients, 200, response);

		const dispatched: TestDispatchType<{}>[] = []
		const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
			{
				dispatch: action => dispatched.push(action),
				getState: () => dummyRootAppState()
			},
			// @ts-ignore
			() => initIngredientsSaga(),
		)

		await saga.toPromise()

		expect(dispatched).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: BurgerActionTypes.SET_INGREDIENTS,
				}),
				expect.objectContaining({
					ingredients: {
						...dummyEmptyIngredients
					},
				}),
			]),
		)
	})

	it('initIngredientsSaga fails', async () => {
		mockApi(API.getIngredients, 403, {});

		const dispatched: TestDispatchType<{}>[] = []
		const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
				{
					dispatch: action => dispatched.push(action),
					getState: () => dummyRootAppState()
				},
				// @ts-ignore
				() => initIngredientsSaga(),
		)

		await saga.toPromise()

		expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: BurgerActionTypes.FETCH_INGREDIENTS_FAILED,
					}),
				]),
		)
	})
})
