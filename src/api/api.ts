import axios from '../axios-orders'
import { BASE_URL, INGREDIENTS_URL } from '../utils/constants'
import { OrderType } from '../containers/Orders/ordersType'

const API = {
	getIngredients() {
		return axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
	},

	setPurchaseBurger(token: string, orderData: OrderType) {
		return axios.post(`/orders.json?auth=${token}`, orderData)
	},

	fetchOrders(token: string, userId: string) {
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
		return axios.get(`/orders.json${queryParams}`)
	}
}

export default API
