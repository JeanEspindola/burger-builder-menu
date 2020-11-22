import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'
import Burger from '../Burger'
import { dummyEmptyIngredients } from '../../../tests/testObjects/dummyBurgerData'

describe('Burger', () => {
	test('renders empty burger correctly', () => {
		WrappedRender(
				<Burger
						ingredients={dummyEmptyIngredients}
				/>,
		)

		const heading = screen.getByText(/please start adding ingredients!/i)
		expect(heading).toBeInTheDocument()
	})
})
