import * as React from 'react';
import { screen, within } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import Layout from '../Layout'
import { dummyRootAppState } from '../../../tests/testObjects/dummyRootState'
import userEvent from '@testing-library/user-event'

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

		const banner = screen.getByRole('banner');

		const myBurgerImg = within(banner).getByRole('img', {
			name: /myburger/i
		})

		const burger = within(banner).getByRole('link', {
			name: /burger builder/i
		})

		const authenticate = within(banner).getByRole('link', {
			name: /authenticate/i
		})

		const test = screen.getByText(/test/i)

		expect(myBurgerImg).toBeInTheDocument()
		expect(burger).toBeInTheDocument()
		expect(authenticate).toBeInTheDocument()
		expect(test).toBeInTheDocument()
	})

	test('open and close sidedrawer', () => {
		const state = dummyRootAppState()
		const store = createDummyStore(state)

		const child = <div>Test</div>
		WrappedRender(
				<Layout>
					{child}
				</Layout>,
				store,
		)

		const sideDrawer = screen.getByTestId('side-drawer')
		const drawerToggle = screen.getByTestId('drawer-toggle')

		expect(sideDrawer).toHaveClass('Close')

		userEvent.click(drawerToggle)
		expect(sideDrawer).not.toHaveClass('Close')
		expect(sideDrawer).toHaveClass('Open')

		const backdrop = screen.getByTestId('backdrop')
		userEvent.click(backdrop)

		expect(sideDrawer).toHaveClass('Close')
		expect(sideDrawer).not.toHaveClass('Open')
	})
})
