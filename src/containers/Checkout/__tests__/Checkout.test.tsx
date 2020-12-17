import * as React from 'react';
import { screen } from '@testing-library/react';
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'
import Checkout from '../Checkout'
import { dummyLocation } from 'tests/testObjects/dummyRouter'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import userEvent from '@testing-library/user-event'

describe('Checkout', () => {
	const match = {
		path: '/checkout',
	}

	const state = dummyRootAppState()

	test('renders Checkout correctly', () => {
		const newState = { ...state }
		const { order, burgerBuilder } = newState

		newState.order = {
			...order,
			purchased: true,
		}
		newState.burgerBuilder = {
			...burgerBuilder,
			ingredients: { ...dummyOrderIngredients }
		}

		const dummyStore = createDummyStore(newState)

		WrappedRender(
				<Checkout
						match={match}
						location={dummyLocation}
				/>,
				dummyStore,
		)

		const titleText = screen.getByRole('heading', { name: /we hope it tastes well!!/i })
		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		const continueBtn = screen.getByRole('button', { name: /continue/i })

		expect(titleText).toBeInTheDocument()
		expect(cancelBtn).toBeInTheDocument()
		expect(continueBtn).toBeInTheDocument()
	})

	test('redirect when there is no ingredient', () => {
		const newState = { ...state }

		const dummyStore = createDummyStore(newState)

		WrappedRender(
				<>
					<Checkout
							match={match}
							location={dummyLocation}
					/>
					<Route path="/">Test Redirect</Route>
				</>,
				dummyStore,
		)

		const redirect = screen.getByText(/test redirect/i)
		expect(redirect).toBeInTheDocument()
	})

	test('click on cancel order and check history', () => {
		const newState = { ...state }
		const { burgerBuilder } = newState

		newState.burgerBuilder = {
			...burgerBuilder,
			ingredients: { ...dummyOrderIngredients }
		}

		const store = createDummyStore(newState)
		const history = createBrowserHistory()

		const goBackSpy = jest.spyOn(history, 'goBack');

		WrappedRender(
				<Checkout
						history={history}
						match={match}
						location={dummyLocation}
				/>,
				store,
		)

		const cancelBtn = screen.getByRole('button', { name: /cancel/i })
		userEvent.click(cancelBtn)

		expect(goBackSpy).toHaveBeenCalled()
	})

	test('click on continue order and check history', () => {
		const newState = { ...state }
		const { burgerBuilder } = newState

		newState.burgerBuilder = {
			...burgerBuilder,
			ingredients: { ...dummyOrderIngredients }
		}

		const store = createDummyStore(newState)
		const history = createBrowserHistory()

		const replaceSpy = jest.spyOn(history, 'replace');

		WrappedRender(
				<Checkout
						history={history}
						match={match}
						location={dummyLocation}
				/>,
				store,
		)

		const continueBtn = screen.getByRole('button', { name: /continue/i })
		userEvent.click(continueBtn)

		expect(replaceSpy).toHaveBeenCalledWith('/checkout/contact-data')
	})
})
