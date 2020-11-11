import { AuthState } from '../rootTypes'
import { AnyAction } from 'redux'
import { AuthActionTypes } from '../actions/actionTypes'

const initialState: AuthState = {
	token: '',
	userId: '',
	error: '',
	loading: false,
}

export const authReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case AuthActionTypes.AUTH_START:
			return {
				...state,
				error: '',
				loading: true,
			}
		case AuthActionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.idToken,
				userId: action.userId,
				error: '',
				loading: false,
			}
		case AuthActionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			}
		default:
			return state
	}
}
