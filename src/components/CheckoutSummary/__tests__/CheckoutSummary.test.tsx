import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'
import CheckoutSummary from '../CheckoutSummary'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'

describe('CheckoutSummary', () => {
	test('renders CheckoutSummary correctly', () => {
		const checkoutCancelled = jest.fn()
		const checkoutContinued = jest.fn()

		WrappedRender(
				<CheckoutSummary
						ingredients={dummyOrderIngredients}
						checkoutCancelled={checkoutCancelled}
						checkoutContinued={checkoutContinued}
				/>,
		)

		const heading = screen.getByRole('heading', { name: /we hope it tastes well!!/i })
		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		const continueBtn = screen.getByRole('button', { name: /continue/i })

		expect(heading).toBeInTheDocument()
		expect(cancelBtn).toBeInTheDocument()
		expect(continueBtn).toBeInTheDocument()
	})
})
