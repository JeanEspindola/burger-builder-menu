import { takeEvery } from 'redux-saga/effects'
import { authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga } from './sagas/authSagas'
import { AuthActionTypes } from './actions/actionTypes'

export function* watchAuth() {
	yield takeEvery(AuthActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
	yield takeEvery(AuthActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
	yield takeEvery(AuthActionTypes.AUTH_USER, authUserSaga)
	yield takeEvery(AuthActionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}
