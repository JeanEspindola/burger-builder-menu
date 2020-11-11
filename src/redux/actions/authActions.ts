import { AuthActionTypes } from './actionTypes'
import axios from 'axios'
import { AnyAction, Dispatch } from 'redux'
import { API_KEY, AUTH_BASE_URL, SIGN_IN_URL, SING_UP_URL } from '../../utils/constants'

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
	type: AuthActionTypes.AUTH_LOGOUT,
})

export const checkAuthTimeout = (expirationTime: number) => {
	return (dispatch: Dispatch) => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const auth = (email: string, password: string, isSignup: boolean) => {
	return (dispatch: Dispatch) => {
		dispatch(authStart())
		const authData = {
			email,
			password,
			returnSecureToken: true,
		}

		let postType = SING_UP_URL

		if (!isSignup) {
			postType = SIGN_IN_URL
		}

		const url = `${AUTH_BASE_URL}${postType}${API_KEY}`
		axios.post(url, authData)
				.then(response => {
					dispatch(authSuccess(response.data.idToken, response.data.localId))
					// @ts-ignore
					dispatch(checkAuthTimeout(Number(response.data.expiresIn)))
				})
				.catch(err => {
					dispatch(authFail(err.response.data.error.message))
				})
	}
}
