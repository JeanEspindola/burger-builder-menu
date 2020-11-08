import { PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS } from './actionTypes'
import axios from '../../axios-orders'
import { Dispatch } from 'redux'

// @ts-ignore
export const purchaseBurgerSuccess = (id, orderData) => ({
	type: PURCHASE_BURGER_SUCCESS,
	orderId: id,
	orderData: orderData,
})

export const purchaseBurgerFail = (error: boolean) => ({
	type: PURCHASE_BURGER_SUCCESS,
	error: error,
})

export const purchaseBurgerStart = () => ({
	type: PURCHASE_BURGER_START
})


// @ts-ignore
export const purchaseBurger = (orderData) => {
	return (dispatch: Dispatch) => {
		dispatch(purchaseBurgerStart())
		axios.post('/orders.json', orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error))
			})
	}
}
