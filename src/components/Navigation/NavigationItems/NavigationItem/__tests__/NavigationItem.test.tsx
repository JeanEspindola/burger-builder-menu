import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import { IntlProvider } from 'react-intl'
import translationMessages from '../../../../../i18n/translationMessages'
import NavigationItem from '../NavigationItem'
import { MemoryRouter } from 'react-router';

describe('NavigationItem', () => {
	// @ts-ignore
	const Wrapper = ({children}) => (
			<IntlProvider
					key="en"
					locale="en"
					defaultLocale="en"
					messages={translationMessages['en']}
			>
				<MemoryRouter>
					{children}
				</MemoryRouter>
			</IntlProvider>
	)

	test('renders correctly input text', () => {
		const contentLink = 'Test'
		const link = '/test'

		render(
				// @ts-ignore
				<NavigationItem link={link} exact>
					{contentLink}
				</NavigationItem>,
				// @ts-ignore
				{wrapper: Wrapper})


		const linkElem = screen.getByRole('link', { name: /test/i })
		expect(linkElem).toBeInTheDocument()
	})
})
