import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyRootAppState } from '../../../tests/testObjects/dummyRootState'
import { dummyOrders } from '../../../tests/testObjects/dummyOrderData'
import Orders from '../Orders'

describe('Orders', () => {
	test('renders correctly a list with one order', () => {
		const state = dummyRootAppState()
		state.order.orders = [ ...dummyOrders ]
		state.order.loading = false
		state.auth.userId = 'xxxAAA'
		state.auth.token = '12345'

		const store = createDummyStore(state)

		WrappedRender(<Orders />, store)

		const ingredients = screen.getByText(/ingredients:/i)
		const bacon = screen.getByText(/bacon/i)
		const cheese = screen.getByText(/cheese/i)
		const meat = screen.getByText(/meat/i)
		const salad = screen.getByText(/salad/i)

		const currentPrice = screen.getByText(/price:/i)

		expect(ingredients).toBeInTheDocument()
		expect(bacon).toHaveTextContent(/bacon \(3\)/i)
		expect(cheese).toHaveTextContent(/cheese \(1\)/i)
		expect(meat).toHaveTextContent(/meat \(2\)/i)
		expect(salad).toHaveTextContent(/salad \(1\)/i)
		expect(currentPrice).toHaveTextContent(/price: \$9.20/i)
	})
})
