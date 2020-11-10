export enum IngredientsEnum {
	salad = 'salad',
	bacon = 'bacon',
	meat = 'meat',
	cheese = 'cheese',
	breadBottom = 'breadBottom',
	breadTop = 'breadTop'
}

export enum IngredientsLabel {
	salad = 'Salad',
	bacon = 'Bacon',
	meat = 'Meat',
	cheese = 'Cheese',
}

export enum ButtonsEnum {
	danger = 'Danger',
	success = 'Success',
}

export const BASE_URL = 'https://react-burger-builder-menu.firebaseio.com/'
export const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
export const API_KEY = 'AIzaSyAk9OHZ2MBlIahZ_pPgxkzhDnUsKjkLh94'
export const INGREDIENTS_URL = 'ingredients.json'

export const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
