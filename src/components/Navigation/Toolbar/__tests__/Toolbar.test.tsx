import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from '../../../../tests/testUtils'
import Toolbar from '../Toolbar'

describe('Toolbar', () => {
	test('renders toolbar correctly', () => {
		const func = jest.fn()
		WrappedRender(<Toolbar isAuth={true} drawerToggleClicked={func} />)

		const img = screen.getByRole('img', { name: /myburger/i })
		const logout = screen.getByRole('link', { name: /logout/i })
		const orders = screen.getByRole('link', { name: /orders/i })
		const burgerBuilder = screen.getByRole('link', { name: /burger builder/i })

		expect(img).toBeInTheDocument()
		expect(logout).toBeInTheDocument()
		expect(orders).toBeInTheDocument()
		expect(burgerBuilder).toBeInTheDocument()
	})
})
