import React from 'react';
import { render } from '@testing-library/react';
import translationMessages from '../i18n/translationMessages'
import { MemoryRouter } from 'react-router'
import { IntlProvider } from 'react-intl'

export const WrappedRender = (component: React.ReactElement, store?: any) => {
	const Wrapper: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
		children,
	}) => (
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

	return {
		...render(component, {
			wrapper: Wrapper,
		})
	}
}
