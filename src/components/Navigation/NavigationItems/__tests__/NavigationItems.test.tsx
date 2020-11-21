import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from '../../../../tests/testUtils'
import NavigationItems from '../NavigationItems'

describe('NavigationItems', () => {
	test('renders navigation items authenticated', () => {
		WrappedRender(<NavigationItems isAuthenticated={true} />)

		const logout = screen.getByRole('link', { name: /logout/i })
		const orders = screen.getByRole('link', { name: /orders/i })
		const burgerBuilder = screen.getByRole('link', { name: /burger builder/i })

		expect(logout).toBeInTheDocument()
		expect(orders).toBeInTheDocument()
		expect(burgerBuilder).toBeInTheDocument()
	})

	test('renders navigation items unauthenticated', () => {
		WrappedRender(<NavigationItems isAuthenticated={false} />)

		const logout = screen.queryByRole('link', { name: /logout/i })
		const orders = screen.queryByRole('link', { name: /orders/i })
		const burgerBuilder = screen.getByRole('link', { name: /burger builder/i })
		const authenticate = screen.getByRole('link', { name: /authenticate/i })

		expect(logout).not.toBeInTheDocument()
		expect(orders).not.toBeInTheDocument()
		expect(burgerBuilder).toBeInTheDocument()
		expect(authenticate).toBeInTheDocument()
	})
})
