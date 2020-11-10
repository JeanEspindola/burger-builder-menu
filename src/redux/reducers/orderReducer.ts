import { AnyAction } from 'redux'
import { PurchaseActionTypes, OrdersActionTypes } from '../actions/actionTypes'

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
		case PurchaseActionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			}
		case PurchaseActionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			}
		case PurchaseActionTypes.PURCHASE_BURGER_SUCCESS:
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
		case PurchaseActionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		case OrdersActionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			}
		case OrdersActionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false,
			}
		case OrdersActionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			}
		default:
			return state;
	}
}
