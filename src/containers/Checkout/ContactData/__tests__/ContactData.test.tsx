import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import ContactData from '../ContactData'
import { dummyRootAppState } from '../../../../tests/testObjects/dummyRootState'
import { dummyOrderIngredients, dummyOrders } from '../../../../tests/testObjects/dummyOrderData'
import userEvent from '@testing-library/user-event'
import { purchaseBurger } from '../../../../redux/actions/orderActions'

describe('ContactData', () => {
	const state = dummyRootAppState()
	state.order.orders = [ ...dummyOrders ]
	state.order.loading = false
	state.auth.userId = 'xxxAAA'
	state.auth.token = '12345'

	test('renders correctly contact data', () => {
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
		const newState = { ...state }
		const { order } = newState

		newState.order = {
			...order,
			loading: true,
		}

		const store = createDummyStore(newState)

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

	test('fill the form and submit the data', () => {
		const newState = { ...state }
		const { burgerBuilder, auth } = newState

		newState.burgerBuilder = {
			...burgerBuilder,
			ingredients: { ...dummyOrderIngredients }
		}

		const store = createDummyStore(state)

		WrappedRender(<ContactData />, store)

		const name = screen.getByPlaceholderText(/your name/i)
		userEvent.type(name, 'Jean')

		const street = screen.getByPlaceholderText(/street/i)
		userEvent.type(street, 'Strasse 1')

		const postalCode = screen.getByPlaceholderText(/postal code/i)
		userEvent.type(postalCode, '80000')

		const country = screen.getByPlaceholderText(/country/i)
		userEvent.type(country, 'Germany')

		const email = screen.getByPlaceholderText(/your email/i)
		userEvent.type(email, 'test@email.com')

		const orderButton = screen.getByRole('button', { name: /order/i })
		userEvent.click(orderButton)

		const { userId, token } = auth
		const { totalPrice, ingredients } = burgerBuilder

		const order = {
			price: totalPrice,
			orderData: {
				name: 'Jean',
				country: 'Germany',
				email: 'test@email.com',
				street: 'Strasse 1',
				zipCode: '80000',
				deliveryMethod: 'fastest',
			},
			ingredients,
			userId,
		}

		expect(store.dispatch).toHaveBeenCalledWith(
				// @ts-ignore
				purchaseBurger(order, token)
		)
	})
})
