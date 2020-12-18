import { OrderType, PurchaseOrderType } from '../../containers/Orders/ordersType'
import { IngredientsEnum } from '../../utils/constants'
import { IngredientsType } from '../../utils/types'

export enum BurgerActionTypes {
	ADD_INGREDIENT = 'ADD_INGREDIENT',
	FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED',
	INIT_INGREDIENTS = 'INIT_INGREDIENTS',
	REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
	SET_INGREDIENTS = 'SET_INGREDIENTS',
}

export enum PurchaseActionTypes {
	PURCHASE_BURGER_START = 'PURCHASE_BURGER_START',
	PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS',
	PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL',
	PURCHASE_INIT = 'PURCHASE_INIT',
}

export enum OrdersActionTypes {
	FETCH_ORDERS = 'FETCH_ORDERS',
	FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL',
	FETCH_ORDERS_START = 'FETCH_ORDERS_START',
	FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
	PURCHASE_BURGER = 'PURCHASE_BURGER',
}

export enum AuthActionTypes {
	AUTH_CHECK_STATE = 'AUTH_CHECK_STATE',
	AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT',
	AUTH_FAIL = 'AUTH_FAIL',
	AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT',
	AUTH_LOGOUT = 'AUTH_LOGOUT',
	AUTH_START = 'AUTH_START',
	AUTH_SUCCESS = 'AUTH_SUCCESS',
	AUTH_USER = 'AUTH_USER',
	SET_AUTH_REDIRECT = 'SET_AUTH_REDIRECT',
	SET_AUTH_INITIALIZED = 'SET_AUTH_INITIALIZED',
}

export type PurchaseBurgerSuccessType = { type: string; orderId: string; orderData: PurchaseOrderType }
export type PurchaseBurgerFailType = { type: string; error: boolean }
export type PurchaseBurgerStartType = { type: string; }
export type PurchaseBurgerType = { type: string; token: string; orderData: PurchaseOrderType }
export type PurchaseInitType = { type: string; }
export type FetchOrdersSuccessType = { type: string; orders: OrderType[] }
export type FetchOrdersFailType = { type: string; error: boolean }
export type FetchOrdersStartType = { type: string; }
export type FetchOrdersType = { type: string; token: string; userId: string }

export type AddIngredientType = { type: string; ingredient: IngredientsEnum }
export type RemoveIngredientType = { type: string; ingredient: IngredientsEnum }
export type SetIngredientsType = { type: string; ingredients: IngredientsType }
export type FetchIngredientsFailedType = { type: string; }
export type FetchIngredientsType = { type: string; }

export type AuthStartType = { type: string; }
export type AuthSuccessType = { type: string; idToken: string; userId: string }
export type AuthFailType = { type: string; error: string }
export type LogoutType = { type: string; }
export type LogoutSucceedType = { type: string; }
export type CheckAuthTimeoutType = { type: string; expirationTime: number }
export type AuthType = { type: string; email: string; password: string; isSignup: boolean }
export type SetAuthRedirectPathType = { type: string; path: string }
export type AuthCheckStateType = { type: string; }
export type SetAuthInitilizedType = { type: string; }


export type AuthData = {
	email: string
	password: string
	returnSecureToken: boolean
}
