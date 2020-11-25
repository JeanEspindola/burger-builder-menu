import { AuthActionTypes } from './actionTypes'
import { AnyAction } from 'redux'

export const authStart = () => ({
	type: AuthActionTypes.AUTH_START,
})

export const authSuccess = (idToken: string, userId: string) => ({
	type: AuthActionTypes.AUTH_SUCCESS,
	idToken,
	userId,
})

export const authFail = (error: string): AnyAction => ({
	type: AuthActionTypes.AUTH_FAIL,
	error: error,
})

export const logout = () => ({
	type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
})

export const logoutSucceed = () => ({
	type: AuthActionTypes.AUTH_LOGOUT,
})

export const checkAuthTimeout = (expirationTime: number) => ({
	type: AuthActionTypes.AUTH_CHECK_TIMEOUT,
	expirationTime,
})

export const auth = (email: string, password: string, isSignup: boolean) => ({
	type: AuthActionTypes.AUTH_USER,
	email,
	password,
	isSignup,
})

export const setAuthRedirectPath = (path: string) => ({
	type: AuthActionTypes.SET_AUTH_REDIRECT,
	path,
})

export const authCheckState = () => ({
	type: AuthActionTypes.AUTH_CHECK_STATE,
})

export const setAuthInitilized = () => ({
	type: AuthActionTypes.SET_AUTH_INITIALIZED,
})
