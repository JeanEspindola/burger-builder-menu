import { IngredientsType } from 'utils/types'
import { RouteComponentProps } from 'react-router-dom'

export interface ContactDataProps {
	ingredients: IngredientsType
	price: number
	history: RouteComponentProps['history']
	loading: boolean
	onPurchaseBurgerStart: (order: any) => void
}

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
}

interface FormSelectionElement {
	value: string,
	displayValue: string
}

interface OrderFormElementDesc {
	elementType: string
	elementConfig: {
		type?: string,
		placeholder?: string
		options?: FormSelectionElement[]
	},
	value: string,
	validation: FormInputValidation
	valid: boolean
	touched?: boolean
}

interface OrderFormElement {
	[key: string]: OrderFormElementDesc,
}

export interface ContactDataStateType {
	orderForm: OrderFormElement
	formValid: boolean
}
