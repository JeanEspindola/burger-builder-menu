import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from './actionTypes'
import axios from 'axios'
import { Dispatch } from 'redux'
import { API_KEY, AUTH_URL } from '../../utils/constants'

export const authStart = () => ({
	type: AUTH_START,
})

// @ts-ignore
export const authSuccess = (authData) => ({
	type: AUTH_SUCCESS,
	authData: authData,
})

export const authFail = (error: string) => ({
	type: AUTH_FAIL,
	error: error,
})

export const auth = (email: string, password: string) => {
	return (dispatch: Dispatch) => {
		dispatch(authStart())
		const authData = {
			email,
			password,
			returnSecureToken: true,
		}

		axios.post(`${AUTH_URL}${API_KEY}`, authData)
				.then(response => {
					dispatch(authSuccess(response.data))
				})
				.catch(err => {
					dispatch(authFail(err.message))
				})
	}
}
