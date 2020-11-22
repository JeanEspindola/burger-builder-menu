import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'
import BuildControls from '../BuildControls'
import { DisableInfoType } from '../../../../utils/types'
import userEvent from '@testing-library/user-event'

describe('BuildControls', () => {
	const ingredientAdded = jest.fn()
	const ingredientRemoved = jest.fn()
	const ordered = jest.fn()
	const price = 4
	const disabledInfo: DisableInfoType = {
		salad: true,
		cheese: true,
		bacon: true,
		meat: true,
	}

	beforeEach(() => {
		WrappedRender(
				<BuildControls
						price={price}
						isAuth={true}
						disabled={disabledInfo}
						ingredientAdded={ingredientAdded}
						ingredientRemoved={ingredientRemoved}
						ordered={ordered}
						purchasable={false}
				/>,
		)
	})

	test('renders BuildControls correctly', () => {
		const currentPrice = screen.getByText(/current price/i)
		const bacon = screen.getByText(/bacon/i)
		const cheese = screen.getByText(/cheese/i)
		const meat = screen.getByText(/meat/i)
		const salad = screen.getByText(/salad/i)

		const orderNowBtn = screen.getByRole('button', { name: /order now/i })

		expect(currentPrice).toHaveTextContent('Current price: 4.00')
		expect(bacon).toBeInTheDocument()
		expect(cheese).toBeInTheDocument()
		expect(meat).toBeInTheDocument()
		expect(salad).toBeInTheDocument()

		expect(orderNowBtn).toBeDisabled()
	})

	test('click on user events and check price and button', () => {
		const currentPrice = screen.getByText(/current price/i)
		expect(currentPrice).toHaveTextContent('Current price: 4.00')

		const orderNowBtn = screen.getByRole('button', { name: /order now/i })
		expect(orderNowBtn).toBeDisabled()

		/* Buttons of Bacon ingredient */
		const lessButton = screen.getAllByRole('button', { name: /less/i })[0]
		expect(lessButton).toBeDisabled()

		const moreButton = screen.getAllByRole('button', { name: /more/i })[0]
		expect(moreButton).not.toBeDisabled()

		userEvent.click(moreButton)
		expect(ingredientAdded).toHaveBeenCalledTimes(1)

		userEvent.click(lessButton)
		expect(ingredientAdded).toHaveBeenCalledTimes(1)
	})
})
