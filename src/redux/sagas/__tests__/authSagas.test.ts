import { RootStateType } from '../../rootTypes'
import { mockApi, TestDispatchType } from '../../../tests/testUtils'
import { AnyAction } from 'redux'
import { runSaga, SagaIterator } from 'redux-saga'
import { AuthActionTypes, AuthType } from '../../actions/actionTypes'
import API from '../../../api/api'
import { dummyRootAppState } from '../../../tests/testObjects/dummyRootState'
import { dummyAuthResponse } from '../../../tests/testObjects/dummyAuthData'
import { authUserSaga } from '../authSagas'

jest.mock('../../../api/api');

describe('authSagas', () => {
	describe('authUserSaga', () => {
		const authAction: AuthType = {
			type: AuthActionTypes.AUTH_USER,
			email: 'abc@test.com',
			password: 'password123',
			isSignup: true,
		}

		it('authUser success', async () => {
			const response = {
				data: {
					...dummyAuthResponse,
				}
			}

			mockApi(API.authenticateUser, 200, response);

			const dispatched: TestDispatchType<{}>[] = []
			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authUserSaga(authAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							type: AuthActionTypes.AUTH_START,
						}),
						expect.objectContaining({
							idToken: dummyAuthResponse.idToken,
							type: AuthActionTypes.AUTH_SUCCESS,
							userId: dummyAuthResponse.localId,
						}),
						expect.objectContaining({
							type: AuthActionTypes.AUTH_CHECK_TIMEOUT,
							expirationTime: dummyAuthResponse.expiresIn,
						}),
					]),
			)
		})

		it('authUser fails', async () => {
			const errorResponse = {
				response: {
					data: {
						error: {
							message: 'error message',
						}
					},
				}
			}

			mockApi(API.authenticateUser, 403, errorResponse);

			const dispatched: TestDispatchType<{}>[] = []
			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authUserSaga(authAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: AuthActionTypes.AUTH_START,
					}),
					expect.objectContaining({
						error: errorResponse.response.data.error.message,
						type: AuthActionTypes.AUTH_FAIL,
					}),
				]),
			)
		})
	})
})
