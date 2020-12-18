import axiosOrder from '../axios-orders'
import {
	API_KEY,
	AUTH_BASE_URL,
	BASE_URL,
	INGREDIENTS_URL,
	ORDERS_URL,
	SIGN_IN_URL,
	SING_UP_URL
} from '../utils/constants'
import { PurchaseOrderType } from '../containers/Orders/ordersType'
import axios from 'axios'
import { AuthData } from '../redux/actions/actionTypes'

const API = {
	getIngredients() {
		return axiosOrder.get(`${BASE_URL}${INGREDIENTS_URL}`)
	},

	setPurchaseBurger(token: string, orderData: PurchaseOrderType) {
		return axiosOrder.post(`${ORDERS_URL}?auth=${token}`, orderData)
	},

	fetchOrders(token: string, userId: string) {
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
		return axiosOrder.get(`${ORDERS_URL}${queryParams}`)
	},

	authenticateUser(isSignup: boolean, authData: AuthData) {
		let postType = SING_UP_URL

		if (!isSignup) {
			postType = SIGN_IN_URL
		}
		const url = `${AUTH_BASE_URL}${postType}${API_KEY}`

		return axios.post(url, authData)
	}
}

export default API
