import { authReducer } from '../authReducer'
import { dummyAuthState } from 'tests/testObjects/dummyAuthData'
import { AuthActionTypes } from '../../actions/actionTypes'

describe('authReducer', () => {
	test('auth start action', () => {
		const newState = authReducer(
			{ ...dummyAuthState },
			{
				type: AuthActionTypes.AUTH_START,
			}
		)

		expect(newState.loading).toBeTruthy()
	})

	test('auth success action', () => {
		const tempState = { ...dummyAuthState }
		tempState.error = 'error'
		tempState.loading = true

		const idToken = 'aaaa'
		const userId = 'user123'

		const newState = authReducer(
			{ ...tempState },
			{
				type: AuthActionTypes.AUTH_SUCCESS,
					idToken,
					userId,
			}
		)

		expect(newState.loading).toBeFalsy()
		expect(newState.error).toEqual('')
		expect(newState.userId).toEqual(userId)
		expect(newState.token).toEqual(idToken)
	})

	test('auth fail action', () => {
		const tempState = { ...dummyAuthState }
		tempState.loading = true

		const error = 'error'

		const newState = authReducer(
				{ ...tempState },
				{
					type: AuthActionTypes.AUTH_FAIL,
					error,
				}
		)

		expect(newState.loading).toBeFalsy()
		expect(newState.error).toEqual(error)
	})

	test('auth logout action', () => {
		const tempState = { ...dummyAuthState }
		tempState.token = 'toker'
		tempState.userId = 'user123'

		const error = 'error'

		const newState = authReducer(
				{ ...tempState },
				{
					type: AuthActionTypes.AUTH_LOGOUT,
					error,
				}
		)

		expect(newState.token).toEqual('')
		expect(newState.userId).toEqual('')
	})

	test('set auth redirect action', () => {
		const path = '/new-path'

		const newState = authReducer(
				{ ...dummyAuthState },
				{
					type: AuthActionTypes.SET_AUTH_REDIRECT,
					path,
				}
		)

		expect(newState.authRedirectPath).toEqual(path)
	})

	test('set auth initialized action', () => {

		const newState = authReducer(
				{ ...dummyAuthState },
				{
					type: AuthActionTypes.SET_AUTH_INITIALIZED,
				}
		)

		expect(newState.authInitialized).toBeTruthy()
	})
})
