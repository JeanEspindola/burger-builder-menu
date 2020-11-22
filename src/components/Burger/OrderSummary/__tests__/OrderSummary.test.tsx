import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'
import OrderSummary from '../OrderSummary'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'

describe('OrderSummary', () => {
	const purchaseCanceled = jest.fn()
	const purchaseContinued = jest.fn()

	test('renders correctly OrderSummary text', () => {
		WrappedRender(
				<OrderSummary
						ingredients={dummyOrderIngredients}
						price={9.2}
						purchaseCanceled={purchaseCanceled}
						purchaseContinued={purchaseContinued}
				/>,
		)

		const heading = screen.getByRole('heading', { name: /your order/i })
		const subText = screen.getByText(/a delicious burger with the following ingredients:/i)

		const bacon = screen.getByText(/bacon/i)

		const totalTxt = screen.getByText(/total price/i)
		const continueMsg = screen.getByText(/continue to checkout\?/i)
		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		const continueBtn = screen.getByRole('button', { name: /continue/i })

		expect(heading).toBeInTheDocument()
		expect(subText).toBeInTheDocument()

		expect(bacon).toHaveTextContent('bacon:')

		expect(totalTxt).toHaveTextContent('Total Price: $9.20')
		expect(continueMsg).toBeInTheDocument()
		expect(cancelBtn).toBeInTheDocument()
		expect(continueBtn).toBeInTheDocument()
	})
})
