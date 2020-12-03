import { AuthState } from 'redux/rootTypes'

export const dummyAuthState: AuthState = {
	authInitialized: false,
	userId: '',
	token: '',
	authRedirectPath: '',
	error: '',
	loading: false,
}

export const dummyAuthResponse = {
	expiresIn: 3600,
	idToken: 'xxxAAA',
	localId: 'user123',
}
