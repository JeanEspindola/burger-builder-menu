import axios from '../../axios-orders'
import { put } from '@redux-saga/core/effects';
import { BASE_URL, INGREDIENTS_URL } from '../../utils/constants'
import { fetchIngredientsFailed, setIngredients } from '../actions/burgerBuilderActions'
import { takeEvery } from 'redux-saga/effects'
import { BurgerActionTypes } from '../actions/actionTypes'

// @ts-ignore
export function* initIngredientsSaga(action) {
	try {
		const response = yield axios.get(`${BASE_URL}${INGREDIENTS_URL}`)
		yield put(setIngredients(response.data))
	} catch(error) {
		yield put(fetchIngredientsFailed())
	}
}

export function* burgerBuilderWatcher() {
	yield takeEvery(BurgerActionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}
