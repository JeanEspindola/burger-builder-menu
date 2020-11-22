import { BurgerActionTypes } from '../../actions/actionTypes'
import burgerBuilderReducer, { INGREDIENT_PRICES } from '../burgerBuilderReducer'
import { dummyBurgerBuilderState, dummyEmptyIngredients } from 'tests/testObjects/dummyBurgerData'
import { IngredientsEnum } from 'utils/constants'

describe('burgerBuilderReducer', () => {
	test('setIngredients action', () => {
		const tempState = { ...dummyBurgerBuilderState }
		tempState.totalPrice = 10
		tempState.building = true

		const newState = burgerBuilderReducer(
				{...tempState },
				{
					type: BurgerActionTypes.SET_INGREDIENTS,
					ingredients: dummyEmptyIngredients,
				}
		)

		expect(newState.totalPrice).toEqual(4)
		expect(newState.building).toBeFalsy()
		expect(newState.ingredients).toEqual(dummyEmptyIngredients)
	})

	test('addIngredients action', () => {
		const tempState = { ...dummyBurgerBuilderState }
		tempState.ingredients = dummyEmptyIngredients

		const ingredient = IngredientsEnum.bacon

		const newState = burgerBuilderReducer(
				{ ...tempState },
				{
					type: BurgerActionTypes.ADD_INGREDIENT,
					ingredient,
				}
		)

		expect(newState.totalPrice).toEqual(tempState.totalPrice + INGREDIENT_PRICES[ingredient])
		expect(newState.building).toBeTruthy()
		expect(newState.ingredients[ingredient]).toEqual(1)
	})

	test('removeIngredients action', () => {
		const ingredient = IngredientsEnum.bacon

		const tempState = { ...dummyBurgerBuilderState }
		tempState.ingredients = {
			...dummyEmptyIngredients,
			bacon: 1,
		}
		tempState.totalPrice = tempState.totalPrice + INGREDIENT_PRICES[ingredient]

		const newState = burgerBuilderReducer(
				{ ...tempState },
				{
					type: BurgerActionTypes.REMOVE_INGREDIENT,
					ingredient,
				}
		)

		expect(newState.totalPrice).toEqual(dummyBurgerBuilderState.totalPrice)
		expect(newState.building).toBeTruthy()
		expect(newState.ingredients[ingredient]).toEqual(0)
	})

	test('fetchIngredientsFailed action', () => {
		const newState = burgerBuilderReducer(
				{ ...dummyBurgerBuilderState },
				{
					type: BurgerActionTypes.FETCH_INGREDIENTS_FAILED,
				}
		)

		expect(newState.error).toBeTruthy()
	})
})
