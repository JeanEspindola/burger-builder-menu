import {
	addIngredient,
	fetchIngredients,
	fetchIngredientsFailed,
	removeIngredient,
	setIngredients
} from '../burgerBuilderActions'
import { BurgerActionTypes } from '../actionTypes'
import { dummyEmptyIngredients } from '../../../tests/testObjects/dummyBurgerData'
import { IngredientsEnum } from '../../../utils/constants'

describe('burgerBuilderActions', () => {
	it('dispatch addIngredient', () => {
		expect(addIngredient(IngredientsEnum.meat)).toEqual({
			type: BurgerActionTypes.ADD_INGREDIENT,
			ingredient: IngredientsEnum.meat,
		});
	});

	it('dispatch removeIngredient', () => {
		expect(removeIngredient(IngredientsEnum.meat)).toEqual({
			type: BurgerActionTypes.REMOVE_INGREDIENT,
			ingredient: IngredientsEnum.meat,
		});
	});

	it('dispatch setIngredients', () => {
		expect(setIngredients(dummyEmptyIngredients)).toEqual({
			type: BurgerActionTypes.SET_INGREDIENTS,
			ingredients: dummyEmptyIngredients,
		});
	});

	it('dispatch fetchIngredientsFailed', () => {
		expect(fetchIngredientsFailed()).toEqual({
			type: BurgerActionTypes.FETCH_INGREDIENTS_FAILED,
		});
	});

	it('dispatch fetchIngredients', () => {
		expect(fetchIngredients()).toEqual({
			type: BurgerActionTypes.INIT_INGREDIENTS,
		});
	});
})
