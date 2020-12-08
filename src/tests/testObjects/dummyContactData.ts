import { OrderFormElement } from 'containers/Checkout/ContactData/ContactDataTypes'

export const dummyContactForm: OrderFormElement = {
	name: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'contactData.name'
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	street: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'contactData.street'
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	zipCode: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'contactData.postal'
		},
		value: '',
		validation: {
			required: true,
			minLength: 5,
			maxLength: 5,
		},
		valid: false,
		touched: false,
	},
	country: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'contactData.country'
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	email: {
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'contactData.email'
		},
		value: '',
		validation: {
			required: true,
		},
		valid: false,
		touched: false,
	},
	deliveryMethod: {
		elementType: 'select',
		elementConfig: {
			options: [
				{value: 'fastest', displayValue: 'contactData.fastest'},
				{value: 'cheapest', displayValue: 'contactData.cheapest'},
			],
		},
		valid: true,
		validation: {
			required: false,
		},
		value: 'fastest',
	},
}
