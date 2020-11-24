import { put } from 'redux-saga/effects'
import { AuthActionTypes } from '../actions/actionTypes'

// @ts-ignore
export function* logoutSaga(action) {
	yield localStorage.removeItem('token')
	yield localStorage.removeItem('expirationDate')
	yield localStorage.removeItem('userId')

	yield put({
		type: AuthActionTypes.AUTH_LOGOUT,
	})
}
