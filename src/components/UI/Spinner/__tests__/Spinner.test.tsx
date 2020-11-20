import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import Spinner from '../Spinner'
import translationMessages from '../../../../i18n/translationMessages'
import { IntlProvider } from 'react-intl'

describe('Spinner', () => {
	// @ts-ignore
	const Wrapper = ({children}) => (
			<IntlProvider
					key="en"
					locale="en"
					defaultLocale="en"
					messages={translationMessages['en']}
			>
				{children}
			</IntlProvider>
	)

	test('renders correctly', () => {
		// @ts-ignore
		render(<Spinner />, {wrapper: Wrapper})

		const text = screen.getByText('Loading...')

		expect(text).toBeInTheDocument()
	})
})
