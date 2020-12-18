import { OrderState } from 'redux/rootTypes'
import { CustomerData, FetchedOrdersType, OrderType } from 'containers/Orders/ordersType'
import { IngredientsType } from 'utils/types'

export const dummyOrderState: OrderState = {
	loading: false,
	purchased: false,
	orders: [],
}

export const dummyCustomerData: CustomerData = {
	country: 'Germany',
	deliveryMethod: 'fastest',
	email: 'jean.espindola@gmail.com',
	name: 'Jean Espindola',
	street: 'Peschelanger 9',
	zipCode: '81735'
}

export const dummyOrderIngredients: IngredientsType = {
	bacon: 3,
	cheese: 1,
	meat: 2,
	salad: 1
}

export const dummyOrder: OrderType = {
	id: '123',
	userId: '-123',
	ingredients: dummyOrderIngredients,
	orderData: dummyCustomerData,
	price: 9.2,
}

export const dummyOrders: OrderType[] = [
	dummyOrder
]

export const dummyFetchedOrders: FetchedOrdersType = {
	'123' : {
		userId: '-123',
		ingredients: dummyOrderIngredients,
		orderData: dummyCustomerData,
		price: 9.2,
	}
}
