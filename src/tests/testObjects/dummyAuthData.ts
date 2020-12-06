import { AuthState } from 'redux/rootTypes'
import { OrderFormElement } from '../../containers/Checkout/ContactData/ContactDataTypes'

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

export const dummyAuthData: OrderFormElement = {
	email: {
		elementType: 'input',
				elementConfig: {
			type: 'email',
					placeholder: 'Mail Address'
		},
		value: '',
				validation: {
			required: true,
					isEmail: true,
		},
		valid: false,
				touched: false,
	},
	password: {
		elementType: 'input',
				elementConfig: {
			type: 'password',
					placeholder: 'Password'
		},
		value: '',
				validation: {
			required: true,
					minLength: 6
		},
		valid: false,
				touched: false,
	},
}
