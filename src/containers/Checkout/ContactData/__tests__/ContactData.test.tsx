import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import ContactData from '../ContactData'
import { dummyRootAppState } from '../../../../tests/testObjects/dummyRootState'
import { dummyOrders } from '../../../../tests/testObjects/dummyOrderData'

describe('ContactData', () => {
	test('renders correctly contact data', () => {
		const state = dummyRootAppState()
		state.order.orders = [ ...dummyOrders ]
		state.order.loading = false
		state.auth.userId = 'xxxAAA'
		state.auth.token = '12345'

		const store = createDummyStore(state)

		WrappedRender(<ContactData />, store)

		const heading = screen.getByRole('heading', { name: /enter your contact data:/i })
		const name = screen.getByPlaceholderText(/your name/i)
		const street = screen.getByPlaceholderText(/street/i)
		const postalCode = screen.getByPlaceholderText(/postal code/i)
		const country = screen.getByPlaceholderText(/country/i)
		const email = screen.getByPlaceholderText(/your email/i)
		const cheapest = screen.getByRole('option', {
			name: /cheapest/i
		})
		const fastest = screen.getByRole('option', {
			name: /fastest/i
		})
		const orderButton = screen.getByRole('button', { name: /order/i })

		expect(heading).toBeInTheDocument()
		expect(name).toBeInTheDocument()
		expect(street).toBeInTheDocument()
		expect(postalCode).toBeInTheDocument()
		expect(country).toBeInTheDocument()
		expect(email).toBeInTheDocument()
		expect(cheapest).toBeInTheDocument()
		expect(fastest).toBeInTheDocument()
		expect(orderButton).toBeDisabled()
	})

	test('do not render form while it is loading', () => {
		const state = dummyRootAppState()
		state.order.orders = [ ...dummyOrders ]
		state.order.loading = true
		state.auth.userId = 'xxxAAA'
		state.auth.token = '12345'

		const store = createDummyStore(state)

		WrappedRender(<ContactData />, store)

		const heading = screen.getByRole('heading', { name: /enter your contact data:/i })
		const name = screen.queryByPlaceholderText(/your name/i)
		const loading = screen.getByText('Loading...')
		const orderButton = screen.queryByRole('button', { name: /order/i })

		expect(heading).toBeInTheDocument()
		expect(name).not.toBeInTheDocument()
		expect(orderButton).not.toBeInTheDocument()
		expect(loading).toBeInTheDocument()
	})
})
