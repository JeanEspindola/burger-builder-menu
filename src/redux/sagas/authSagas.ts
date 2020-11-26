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
import { API_KEY, AUTH_BASE_URL, SIGN_IN_URL, SING_UP_URL } from '../../utils/constants'
import axios from 'axios'

// @ts-ignore
export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token')
	yield call([localStorage, 'removeItem'], 'expirationDate')
	yield call([localStorage, 'removeItem'], 'userId')
	yield put(logoutSucceed())
}

// @ts-ignore
export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000)
	yield put(logout())
}

// @ts-ignore
export function* authUserSaga(action) {
	yield put(authStart())
	const { email, password, isSignup } = action

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

	try {
		const response = yield axios.post(url, authData)
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

// @ts-ignore
export function* authCheckStateSaga(action) {
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
