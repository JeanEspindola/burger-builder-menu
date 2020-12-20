import { createDummyStore, WrappedRender } from '../../../../tests/testUtils'
import { Route } from 'react-router-dom'
import { screen } from '@testing-library/react'
import * as React from 'react'
import { dummyRootAppState } from '../../../../tests/testObjects/dummyRootState'
import Logout from '../Logout'

describe('Logout', () => {
	const state = dummyRootAppState()
	const store = createDummyStore(state)

	test('renders correctly', () => {
		WrappedRender(
				<>
					<Logout	/>
					<Route path="/">Test Redirect</Route>
				</>,
				store,
		)

		const redirect = screen.getByText(/test redirect/i)
		expect(redirect).toBeInTheDocument()
	})
})
