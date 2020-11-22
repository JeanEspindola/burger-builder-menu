import { AuthState } from 'redux/rootTypes'

export const dummyAuthState: AuthState = {
	authInitialized: false,
	userId: '',
	token: '',
	authRedirectPath: '',
	error: '',
	loading: false,
}
