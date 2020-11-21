import * as React from 'react';
import { screen } from '@testing-library/react';
import NavigationItem from '../NavigationItem'
import { WrappedRender } from '../../../../../tests/testUtils'

describe('NavigationItem', () => {
	test('renders correctly', () => {
		const contentLink = 'Test'
		const link = '/test'

		WrappedRender(
			<NavigationItem link={link} exact>
				{contentLink}
			</NavigationItem>
		)

		const linkElem = screen.getByRole('link', { name: /test/i })
		expect(linkElem).toBeInTheDocument()
	})
})
