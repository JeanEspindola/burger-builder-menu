import { IngredientsType } from '../../utils/types'

interface OrderData {
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
export interface OrderType {
	id: string
	ingredients: IngredientsType
	orderData: OrderData
	price: number
	userId: string
}

