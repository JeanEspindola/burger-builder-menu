import { AuthActionTypes } from '../actionTypes'
import {
	auth, authCheckState,
	authFail,
	authStart,
	authSuccess,
	checkAuthTimeout,
	logout,
	logoutSucceed,
	setAuthInitilized, setAuthRedirectPath
} from '../authActions'

describe('authActions', () => {
	it('dispatch authStart', () => {
		expect(authStart()).toEqual({
			type: AuthActionTypes.AUTH_START,
		});
	})

	it('dispatch authSuccess', () => {
		const userId = 'user123'
		const idToken = 'xxxAAA'
		expect(authSuccess(idToken, userId)).toEqual({
			type: AuthActionTypes.AUTH_SUCCESS,
			idToken,
			userId,
		});
	})

	it('dispatch authFail', () => {
		const error = 'Error on auth'
		expect(authFail(error)).toEqual({
			type: AuthActionTypes.AUTH_FAIL,
			error,
		});
	})

	it('dispatch logout', () => {
		expect(logout()).toEqual({
			type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
		});
	})

	it('dispatch logoutSucceed', () => {
		expect(logoutSucceed()).toEqual({
			type: AuthActionTypes.AUTH_LOGOUT,
		});
	})

	it('dispatch checkAuthTimeout', () => {
		const expirationTime = 123000
		expect(checkAuthTimeout(expirationTime)).toEqual({
			type: AuthActionTypes.AUTH_CHECK_TIMEOUT,
			expirationTime,
		});
	})

	it('dispatch auth', () => {
		const email = 'abc@test.com'
		const password = 'password123'
		const isSignup = true
		expect(auth(email, password, isSignup)).toEqual({
			type: AuthActionTypes.AUTH_USER,
			email,
			password,
			isSignup,
		});
	})

	it('dispatch setAuthRedirectPath', () => {
		const path = '/orders'
		expect(setAuthRedirectPath(path)).toEqual({
			type: AuthActionTypes.SET_AUTH_REDIRECT,
			path,
		});
	})

	it('dispatch authCheckState', () => {
		expect(authCheckState()).toEqual({
			type: AuthActionTypes.AUTH_CHECK_STATE,
		});
	})

	it('dispatch setAuthInitilized', () => {
		expect(setAuthInitilized()).toEqual({
			type: AuthActionTypes.SET_AUTH_INITIALIZED,
		});
	})
})
