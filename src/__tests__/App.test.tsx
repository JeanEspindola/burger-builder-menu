import * as React from 'react';
import { screen, within, waitFor } from '@testing-library/react';
import { dummyRootAppState } from '../tests/testObjects/dummyRootState'
import { createDummyStore, renderRouteComponent, WrappedRender } from '../tests/testUtils'
import App from '../App'
import userEvent from '@testing-library/user-event'
import Checkout from '../containers/Checkout/Checkout'
import { createMemoryHistory } from 'history'

jest.mock('../containers/Checkout/Checkout')

describe('App', () => {
	const state = dummyRootAppState()

	test('renders App not authenticated and not initialized', () => {
		const newState = { ...state }
		const store = createDummyStore(newState)

		WrappedRender(
				<App />,
				store,
		)

		const loading = screen.getByText(/loading\.\.\./i)
		expect(loading).toBeInTheDocument()
	})

	test('renders App - initialized and authenticated', () => {
		const newState = { ...state }
		const { auth } = newState
		newState.auth = {
			...auth,
			token: 'xxx123',
			authInitialized: true,
		}

		const store = createDummyStore(newState)

		WrappedRender(
				<App />,
				store,
		)

		const banner = screen.getByRole('banner');

		const myBurgerImg = within(banner).getByRole('img', {
			name: /myburger/i
		});

		const burgerBuilder = within(banner).getByRole('link', {
			name: /burger builder/i
		});

		const orders = within(banner).getByRole('link', {
			name: /orders/i
		});

		const logout = within(banner).getByRole('link', {
			name: /logout/i
		});

		const authenticate = within(banner).queryByRole('link', {
			name: /authenticate/i
		});

		expect(myBurgerImg).toBeInTheDocument()
		expect(burgerBuilder).toBeInTheDocument()
		expect(orders).toBeInTheDocument()
		expect(logout).toBeInTheDocument()
		expect(authenticate).not.toBeInTheDocument()
	})

	test('renders App - initialized and authenticated - clicks on orders', () => {
		const newState = { ...state }
		const { auth } = newState
		newState.auth = {
			...auth,
			token: 'xxx123',
			authInitialized: true,
		}

		const store = createDummyStore(newState)

		WrappedRender(
				<App />,
				store,
		)

		const banner = screen.getByRole('banner');
		const orders = within(banner).getByRole('link', {
			name: /orders/i
		});

		expect(orders).not.toHaveClass('active')

		userEvent.click(orders)

		expect(orders).toHaveClass('active')

	})

	test('renders App - initialized and not authenticated', () => {
		const newState = { ...state }
		const { auth } = newState
		newState.auth = {
			...auth,
			authInitialized: true,
		}

		const store = createDummyStore(newState)

		WrappedRender(
				<App />,
				store,
		)

		const banner = screen.getByRole('banner');

		const myBurgerImg = within(banner).getByRole('img', {
			name: /myburger/i
		});

		const burgerBuilder = within(banner).getByRole('link', {
			name: /burger builder/i
		});

		const orders = within(banner).queryByRole('link', {
			name: /orders/i
		});

		const logout = within(banner).queryByRole('link', {
			name: /logout/i
		});

		const authenticate = within(banner).getByRole('link', {
			name: /authenticate/i
		});

		expect(myBurgerImg).toBeInTheDocument()
		expect(burgerBuilder).toBeInTheDocument()
		expect(orders).not.toBeInTheDocument()
		expect(logout).not.toBeInTheDocument()
		expect(authenticate).toBeInTheDocument()
	})

	test('renders App - initialized and not authenticated - click on authenticate', () => {
		const newState = { ...state }
		const { auth } = newState
		newState.auth = {
			...auth,
			authInitialized: true,
		}

		const store = createDummyStore(newState)

		WrappedRender(
				<App />,
				store,
		)

		const banner = screen.getByRole('banner');
		const authenticate = within(banner).getByRole('link', {
			name: /authenticate/i
		});

		expect(authenticate).not.toHaveClass('active')
		userEvent.click(authenticate)
		expect(authenticate).toHaveClass('active')
	})

	test('renders App - test checkout route', async () => {
		const newState = { ...state }
		const { auth } = newState
		newState.auth = {
			...auth,
			authInitialized: true,
			token: 'xxx123',
		}

		const store = createDummyStore(newState)

		// @ts-ignore
		Checkout.mockImplementation(() => <div>Mock Checkout</div>);

		const history = createMemoryHistory()
		history.push('/checkout')

		renderRouteComponent(<App />, store, history)

		await waitFor(() => screen.getByText(/Mock Checkout/i))

		expect(screen.getByText(/Mock Checkout/i)).toBeInTheDocument()
	})
})
