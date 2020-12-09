import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import BurgerBuilder from '../BurgerBuilder'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'

describe('BurgerBuilder', () => {
	test('renders correctly burger - open modal', () => {
		const state = dummyRootAppState()
		state.burgerBuilder.ingredients = { ...dummyOrderIngredients }
		state.burgerBuilder.totalPrice = 10
		state.burgerBuilder.error = false
		state.auth.userId = 'xxxAAA'
		state.auth.token = '12345'

		const store = createDummyStore(state)

		WrappedRender(<BurgerBuilder />, store)

		const heading = screen.getByRole('heading', { name: /your order/i })
		const subText = screen.getByText(/a delicious burger with the following ingredients:/i)

		const bacon = screen.getByText(/bacon:/i)

		const totalTxt = screen.getByText(/total price/i)
		const continueMsg = screen.getByText(/continue to checkout\?/i)
		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		const continueBtn = screen.getByRole('button', { name: /continue/i })
		const currentPrice = screen.getByText(/current price:/i)
		const orderNow = screen.getByRole('button', {
			name: /order now/i
		})

		expect(heading).toBeInTheDocument()
		expect(subText).toBeInTheDocument()

		expect(bacon).toBeInTheDocument()
		expect(totalTxt).toHaveTextContent('Total Price: $10.00')
		expect(continueMsg).toBeInTheDocument()
		expect(cancelBtn).toBeInTheDocument()
		expect(continueBtn).toBeInTheDocument()
		expect(currentPrice).toHaveTextContent(/current Price: 10.00/i)
		expect(orderNow).toBeInTheDocument()
	})
})
