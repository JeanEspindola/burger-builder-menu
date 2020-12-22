import * as React from 'react';
import { screen } from '@testing-library/react'
import { Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import Auth from '../Auth'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import { auth } from '../../../redux/actions/authActions'

describe('Auth', () => {
	const state = dummyRootAppState()
	const store = createDummyStore(state)

	test('renders correctly - not authenticated', () => {
		WrappedRender(
			<Auth />,
			store,
		)

		const email = screen.getByPlaceholderText(/email address/i)
		const password = screen.getByPlaceholderText(/password/i)
		const submitButton = screen.getByRole('button', {
			name: /submit/i
		})
		const switchButton = screen.getByRole('button', {
			name: /switch to signin/i
		})

		expect(email).toBeInTheDocument()
		expect(password).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
		expect(switchButton).toBeInTheDocument()
	})

	test('renders correctly - error', () => {
		const newState = { ...state }
		const { auth } = newState

		const error = 'Error authenticating'

		newState.auth = {
				...auth,
			error,
		}

		const newStore = createDummyStore(newState)

		WrappedRender(
				<Auth />,
				newStore,
		)

		const emailMsg = screen.getByText(error)
		expect(emailMsg).toBeInTheDocument()
	})

	test('renders correctly - loading', () => {
		const newState = { ...state }
		const { auth } = newState

		newState.auth = {
			...auth,
			loading: true,
		}

		const newStore = createDummyStore(newState)

		WrappedRender(
				<Auth />,
				newStore,
		)

		const loading = screen.getByText(/loading.../i)
		expect(loading).toBeInTheDocument()
	})

	test('renders correctly - authenticated checks redirection', () => {
		const newState = { ...state }
		const { auth } = newState

		newState.auth = {
			...auth,
			token: '1234xxx',
			userId: '123',
			authRedirectPath: '/checkout/redirect',
		}

		const newStore = createDummyStore(newState)

		WrappedRender(
				<>
					<Auth />
					<Route path="/checkout/redirect">Test Redirect</Route>
				</>,
				newStore,
		)

		const redirect = screen.getByText(/test redirect/i)
		expect(redirect).toBeInTheDocument()
	})

	test('click on the link and switches to sign in', () => {
		WrappedRender(
				<Auth />,
				store,
		)

		const switchLink = screen.getByRole('button', {
			name: /switch to signin/i
		})

		expect(switchLink).toBeInTheDocument()

		userEvent.click(switchLink)

		expect(screen.queryByRole('button', {
			name: /switch to signin/i
		})).not.toBeInTheDocument()
		expect(screen.getByRole('button', {
			name: /switch to signup/i
		})).toBeInTheDocument()
	})

	test('types an invalid on email input field', () => {
		WrappedRender(
				<Auth />,
				store,
		)

		const email = screen.getByPlaceholderText(/email address/i)

		userEvent.type(email, 'abc@')

		expect(screen.getByDisplayValue('abc@')).toBeInTheDocument()
		expect(email).toHaveClass('Invalid')
	})

	test('fill and submit form', () => {
		WrappedRender(
				<Auth />,
				store,
		)

		const email = screen.getByPlaceholderText(/email address/i)
		const password = screen.getByPlaceholderText(/password/i)
		const submitButton = screen.getByRole('button', {
			name: /submit/i
		})

		userEvent.type(email, 'test@test.de')
		userEvent.type(password, '123456')

		userEvent.click(submitButton)

		expect(store.dispatch).toHaveBeenCalledWith(
				auth('test@test.de', '123456', true)
		)
	})
})
