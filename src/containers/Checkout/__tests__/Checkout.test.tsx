import * as React from 'react';
import { screen } from '@testing-library/react';
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'
import Checkout from '../Checkout'
import { dummyLocation } from 'tests/testObjects/dummyRouter'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'

describe('Checkout', () => {
	const match = {
		path: '/checkout',
	}

	const state = dummyRootAppState()
	state.order.purchased = true
	state.burgerBuilder.ingredients = dummyOrderIngredients
	const dummyStore = createDummyStore(state)

	beforeEach(() => (
		WrappedRender(
			// @ts-ignore
			<Checkout
					match={match}
					location={dummyLocation}
			/>,
			dummyStore,
		)
	))

	test('renders Order correctly', () => {
		const titleText = screen.getByRole('heading', { name: /we hope it tastes well!!/i })
		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		const continueBtn = screen.getByRole('button', { name: /cancel/i })

		expect(titleText).toBeInTheDocument()
		expect(cancelBtn).toBeInTheDocument()
		expect(continueBtn).toBeInTheDocument()
	})
})
