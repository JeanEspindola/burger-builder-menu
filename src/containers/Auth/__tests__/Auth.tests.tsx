import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import Auth from '../Auth'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'

describe('Auth', () => {
	const state = dummyRootAppState()
	const store = createDummyStore(state)

	test('renders correctly', () => {
		WrappedRender(<Auth	/>, store)

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
})
