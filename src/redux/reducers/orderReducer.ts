import { AnyAction } from 'redux'
import {
	FETCH_ORDERS_FAIL,
	FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_INIT
} from '../actions/actionTypes'

export interface OrderState {
	loading: boolean
	orders: []
	purchased: boolean
}

const initialState: OrderState = {
	orders: [],
	loading: false,
	purchased: false
}

export const orderReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			}
		case PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			}
		case PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId,
			}
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true,
			};
		case PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		case FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			}
		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false,
			}
		case FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			}
		default:
			return state;
	}
}
