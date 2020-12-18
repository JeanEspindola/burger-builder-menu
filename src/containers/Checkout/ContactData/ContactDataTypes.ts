export enum OrderFormElementEnum {
	name = 'name',
	street = 'street',
	zipCode = 'zipCode',
	country = 'country',
	email = 'email',
	deliveryMethod = 'deliveryMethod',
}

export interface FormInputValidation {
	required: boolean
	minLength?: number
	maxLength?: number
	isEmail?: boolean
}

interface FormSelectionElement {
	value: string,
	displayValue: string
}

export interface ElementConfigType {
	type?: string,
	placeholder?: string
	options?: FormSelectionElement[]
}

interface OrderFormElementDesc {
	elementType: string
	elementConfig: ElementConfigType,
	value: string,
	validation: FormInputValidation
	valid: boolean
	touched?: boolean
}

export interface OrderFormElement {
	[key: string]: OrderFormElementDesc,
}

export interface ContactDataStateType {
	orderForm: OrderFormElement
	formValid: boolean
}
