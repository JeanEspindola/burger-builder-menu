import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'
import Order from '../Order'

describe('Order', () => {
	test('renders Order correctly', () => {
		WrappedRender(
				<Order
						ingredients={dummyOrderIngredients}
						price={9.2}
				/>,
		)

		const ingredients = screen.getByText(/ingredients:/i)
		const bacon = screen.getByText(/bacon/i)
		const cheese = screen.getByText(/cheese/i)
		const meat = screen.getByText(/meat/i)
		const salad = screen.getByText(/salad/i)

		const totalTxt = screen.getByText(/price/i)

		expect(ingredients).toBeInTheDocument()
		expect(bacon).toHaveTextContent('bacon (3)')
		expect(cheese).toHaveTextContent('cheese (1)')
		expect(meat).toHaveTextContent('meat (2)')
		expect(salad).toHaveTextContent('salad (1)')

		expect(totalTxt).toHaveTextContent('Price: $9.20')
	})
})
