import { put, delay, call } from '@redux-saga/core/effects';
import {
	authFail,
	authStart,
	authSuccess,
	checkAuthTimeout,
	logout,
	logoutSucceed,
	setAuthInitilized
} from '../actions/authActions'
import { all, takeEvery } from 'redux-saga/effects'
import {
	AuthActionTypes,
	AuthData,
	AuthType,
	CheckAuthTimeoutType,
} from '../actions/actionTypes'
import API from 'api/api'

export function* logoutSaga() {
	yield call([localStorage, 'removeItem'], 'token')
	yield call([localStorage, 'removeItem'], 'expirationDate')
	yield call([localStorage, 'removeItem'], 'userId')
	yield put(logoutSucceed())
}

export function* checkAuthTimeoutSaga(action: CheckAuthTimeoutType) {
	yield delay(action.expirationTime * 1000)
	yield put(logout())
}

export function* authUserSaga(action: AuthType) {
	yield put(authStart())
	const { email, password, isSignup } = action

	const authData: AuthData = {
		email,
		password,
		returnSecureToken: true,
	}

	try {
		const response = yield call(API.authenticateUser, isSignup, authData)
		const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

		yield localStorage.setItem('token', response.data.idToken)
		yield localStorage.setItem('expirationDate', expirationDate.toString())
		yield localStorage.setItem('userId', response.data.localId)
		yield put(authSuccess(response.data.idToken, response.data.localId))
		yield put(checkAuthTimeout(Number(response.data.expiresIn)))

	} catch (error) {
		yield put(authFail(error.response.data.error.message))
	}
}

export function* authCheckStateSaga() {
	const token = yield localStorage.getItem('token')

	if (!token) {
		yield put(logout())
	} else {
		const expirationDate = yield new Date(localStorage.getItem('expirationDate') || '')

		if (expirationDate <= new Date()) {
			yield put(logout())
		} else {
			const userId = yield localStorage.getItem('userId') || ''

			yield put(authSuccess(token, userId))
			yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
		}
	}

	yield put(setAuthInitilized())
}

export default function* authWatcher() {
	yield all([
		takeEvery(AuthActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(AuthActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(AuthActionTypes.AUTH_USER, authUserSaga),
		takeEvery(AuthActionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
	])
}
