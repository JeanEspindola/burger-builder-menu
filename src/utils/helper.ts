import { FormInputValidation, OrderFormElement } from '../containers/Checkout/ContactData/ContactDataTypes'
import { EMAIL_REGEX } from './constants'

export const checkValidity = (value: string, rules: FormInputValidation) => {
	let isValid = true
	if (rules.required) {
		isValid = value.trim() !== '' && isValid
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid
	}

	if (rules.isEmail) {
		isValid = EMAIL_REGEX.test(value) && isValid
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid
	}

	return isValid
}

export const createFormArray = (form: OrderFormElement) => {
	const formArray = []

	for (let key in form) {
		formArray.push({
			id: key,
			config: form[key],
		})
	}

	return formArray
}
