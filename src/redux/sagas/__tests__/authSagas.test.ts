import { AnyAction } from 'redux'
import { runSaga, SagaIterator } from 'redux-saga'
import { mockApi, TestDispatchType } from 'tests/testUtils'
import API from 'api/api'
import { RootStateType } from '../../rootTypes'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { AuthActionTypes, AuthType, CheckAuthTimeoutType } from '../../actions/actionTypes'
import { dummyAuthResponse } from 'tests/testObjects/dummyAuthData'
import { authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga } from '../authSagas'

jest.mock('api/api');

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

	describe('authCheckStateSaga', () => {
		afterEach(() => {
			localStorage.removeItem('token')
			localStorage.removeItem('expirationDate')
			localStorage.removeItem('userId')
		})

		it('logout when there is no token', async () => {
			localStorage.setItem('token', '')
			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authCheckStateSaga(),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
						}),
						expect.objectContaining({
							type: AuthActionTypes.SET_AUTH_INITIALIZED,
						}),
					]),
			)
		})

		it('logout when expirationDate is lesser than current date', async () => {
			localStorage.setItem('token', 'xxx123')

			const date = new Date(new Date('2020-01-01').getTime() + 3600 * 1000).toString()
			localStorage.setItem('expirationDate', date)

			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authCheckStateSaga(),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
						}),
						expect.objectContaining({
							type: AuthActionTypes.SET_AUTH_INITIALIZED,
						}),
					]),
			)
		})

		it('authenticate success when expirationDate is greater than current date', async () => {
			localStorage.setItem('token', 'xxx123')

			const date = new Date(new Date('2050-01-01').getTime() + 3600 * 1000).toString()
			localStorage.setItem('expirationDate', date)
			localStorage.setItem('userId', '123')

			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authCheckStateSaga(),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						idToken: 'xxx123',
						type: AuthActionTypes.AUTH_SUCCESS,
						userId: '123',
					}),
					expect.objectContaining({
						type: AuthActionTypes.SET_AUTH_INITIALIZED,
					}),
				]),
			)
		})

		it('authenticate success when expirationDate is greater than current date - no items on localStorage', async () => {
			localStorage.setItem('token', 'xxx123')

			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					// @ts-ignore
					() => authCheckStateSaga(),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							idToken: 'xxx123',
							type: AuthActionTypes.AUTH_SUCCESS,
							userId: '',
						}),
						expect.objectContaining({
							type: AuthActionTypes.SET_AUTH_INITIALIZED,
						}),
					]),
			)
		})
	})

	describe('logoutSaga', () => {
		beforeAll(() => {
			localStorage.setItem('token', '123')
			localStorage.setItem('expirationDate', 'date')
			localStorage.setItem('userId', '123')
		})

		it('logout succeed', async () => {
			jest.spyOn(Storage.prototype, 'removeItem')
			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					() => logoutSaga(),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: AuthActionTypes.AUTH_LOGOUT,
					}),
				]),
			)

			expect(localStorage.removeItem).toHaveBeenCalledTimes(3)
		})
	})

	describe('checkAuthTimeoutSaga', () => {
		const checkAuthTimeoutAction: CheckAuthTimeoutType = {
			type: AuthActionTypes.AUTH_CHECK_TIMEOUT,
			expirationTime: 3
		}

		it('check time out and logout succeed', async () => {
			const dispatched: TestDispatchType<{}>[] = []

			const saga = runSaga<AnyAction, RootStateType, () => SagaIterator>(
					{
						dispatch: action => dispatched.push(action),
						getState: () => dummyRootAppState()
					},
					() => checkAuthTimeoutSaga(checkAuthTimeoutAction),
			)

			await saga.toPromise()

			expect(dispatched).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
					}),
				]),
			)
		})
	})
})
