import * as React from 'react';
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import Layout from '../Layout'
import { dummyRootAppState } from '../../../tests/testObjects/dummyRootState'

describe('Layout', () => {
	test('renders correctly', () => {
		const state = dummyRootAppState()
		const store = createDummyStore(state)

		const child = <div>Test</div>
		WrappedRender(
				<Layout>
					{child}
				</Layout>,
				store,
		)

		const burger = screen.getAllByRole('link', { name: /burger builder/i })
		const authenticate = screen.getAllByRole('link', { name: /authenticate/i })
		const test = screen.getByText(/test/i)

		expect(burger).toHaveLength(2)
		expect(authenticate).toHaveLength(2)
		expect(test).toBeInTheDocument()
	})
})
