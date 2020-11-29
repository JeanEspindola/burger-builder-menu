import { put } from '@redux-saga/core/effects';
import { fetchIngredientsFailed, setIngredients } from '../actions/burgerBuilderActions'
import { takeEvery } from 'redux-saga/effects'
import { BurgerActionTypes } from '../actions/actionTypes'
import API from '../../api/api'

export function* initIngredientsSaga() {
	try {
		const response = yield API.getIngredients()
		yield put(setIngredients(response.data))
	} catch(error) {
		yield put(fetchIngredientsFailed())
	}
}

export default function* burgerBuilderWatcher() {
	yield takeEvery(BurgerActionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}
