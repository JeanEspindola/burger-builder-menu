import {
	AuthActionTypes,
	AuthCheckStateType,
	AuthFailType,
	AuthStartType,
	AuthSuccessType,
	AuthType,
	CheckAuthTimeoutType,
	LogoutSucceedType,
	LogoutType,
	SetAuthInitilizedType,
	SetAuthRedirectPathType
} from './actionTypes'

export const authStart = (): AuthStartType => ({
	type: AuthActionTypes.AUTH_START,
})

export const authSuccess = (idToken: string, userId: string): AuthSuccessType => ({
	type: AuthActionTypes.AUTH_SUCCESS,
	idToken,
	userId,
})

export const authFail = (error: string): AuthFailType => ({
	type: AuthActionTypes.AUTH_FAIL,
	error: error,
})

export const logout = (): LogoutType => ({
	type: AuthActionTypes.AUTH_INITIATE_LOGOUT,
})

export const logoutSucceed = (): LogoutSucceedType => ({
	type: AuthActionTypes.AUTH_LOGOUT,
})

export const checkAuthTimeout = (expirationTime: number): CheckAuthTimeoutType => ({
	type: AuthActionTypes.AUTH_CHECK_TIMEOUT,
	expirationTime,
})

export const auth = (email: string, password: string, isSignup: boolean): AuthType => ({
	type: AuthActionTypes.AUTH_USER,
	email,
	password,
	isSignup,
})

export const setAuthRedirectPath = (path: string): SetAuthRedirectPathType => ({
	type: AuthActionTypes.SET_AUTH_REDIRECT,
	path,
})

export const authCheckState = (): AuthCheckStateType => ({
	type: AuthActionTypes.AUTH_CHECK_STATE,
})

export const setAuthInitilized = (): SetAuthInitilizedType => ({
	type: AuthActionTypes.SET_AUTH_INITIALIZED,
})
