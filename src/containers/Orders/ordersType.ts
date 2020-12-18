import { IngredientsType } from 'utils/types'

export interface CustomerData {
	country: string
	deliveryMethod: string
	email: string
	name: string
	street: string
	zipCode: string
}

export interface OrderIngredients {
	bacon: number
	cheese: number
	meat: number
	salad: number
}

// TODO: check IngredientsType
export interface OrderType extends PurchaseOrderType {
	id: string
}

export interface PurchaseOrderType {
	ingredients: IngredientsType
	orderData: CustomerData
	price: number
	userId: string
}

export interface FetchedOrdersType {
	[key: string]: OrderResponse,
}

export interface OrderResponse {
	ingredients: IngredientsType
	orderData: CustomerData
	price: number
	userId: string
}
