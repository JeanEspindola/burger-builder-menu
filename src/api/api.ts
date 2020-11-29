import axios from '../axios-orders'
import { BASE_URL, INGREDIENTS_URL } from '../utils/constants'

const API = {
	getIngredients() {
		return axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
	}
}

export default API
