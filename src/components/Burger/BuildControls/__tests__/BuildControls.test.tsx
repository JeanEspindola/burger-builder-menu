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

	test('renders BuildControls correctly when authenticated', () => {
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

	test('renders BuildControls correctly when not authenticated', () => {
		WrappedRender(
				<BuildControls
						price={price}
						isAuth={false}
						disabled={disabledInfo}
						ingredientAdded={ingredientAdded}
						ingredientRemoved={ingredientRemoved}
						ordered={ordered}
						purchasable={false}
				/>,
		)

		const currentPrice = screen.getByText(/current price/i)
		const bacon = screen.getByText(/bacon/i)
		const cheese = screen.getByText(/cheese/i)
		const meat = screen.getByText(/meat/i)
		const salad = screen.getByText(/salad/i)
		const orderNowBtn = screen.queryByRole('button', { name: /order now/i })
		const signUpButton = screen.getByRole('button', { name: /sign up to order/i })

		expect(currentPrice).toHaveTextContent('Current price: 4.00')
		expect(bacon).toBeInTheDocument()
		expect(cheese).toBeInTheDocument()
		expect(meat).toBeInTheDocument()
		expect(salad).toBeInTheDocument()
		expect(orderNowBtn).not.toBeInTheDocument()
		expect(signUpButton).toBeDisabled()
	})

	test('click on user events and check price and more button', () => {
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

		/* Buttons of Bacon ingredient */
		const lessButton = screen.getByTestId('less-Bacon')
		expect(lessButton).toBeDisabled()

		const moreButton = screen.getByTestId('more-Bacon')
		expect(moreButton).not.toBeDisabled()


		expect(ingredientAdded).toHaveBeenCalledTimes(0)

		userEvent.click(moreButton)
		expect(ingredientAdded).toHaveBeenCalledTimes(1)
	})

	test('renders without disable button and check the click on remove', () => {
		const disabledData = { ...disabledInfo }
		disabledData.bacon = false

		WrappedRender(
				<BuildControls
						price={price}
						isAuth={true}
						disabled={disabledData}
						ingredientAdded={ingredientAdded}
						ingredientRemoved={ingredientRemoved}
						ordered={ordered}
						purchasable={false}
				/>,
		)

		/* Buttons of Bacon ingredient */
		const lessButton = screen.getByTestId('less-Bacon')
		expect(lessButton).not.toBeDisabled()

		userEvent.click(lessButton)
		expect(ingredientRemoved).toHaveBeenCalledTimes(1)
	})
})
