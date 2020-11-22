import React from 'react';
import { render } from '@testing-library/react';
import translationMessages from '../i18n/translationMessages'
import { MemoryRouter } from 'react-router'
import { IntlProvider } from 'react-intl'
import { RootStateTypes } from '../redux/rootTypes'
import { Provider } from 'react-redux'

export const WrappedRender = (component: React.ReactElement, store?: any) => {
	const Wrapper: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
		children,
	}) => {
		if (store) {
			const mainTestComponent = componentWithoutStore(children)
			return (
				<Provider store={store}>
					{mainTestComponent}
				</Provider>
			)
		} else {
			return componentWithoutStore(children)
		}
	}

	return {
		...render(component, {
			wrapper: Wrapper,
		})
	}
}

const componentWithoutStore = (children: React.ReactNode) => (
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

export const createDummyStore = (state: RootStateTypes) => {
	return {
		dispatch: jest.fn(),
		getState: () => state,
		subscribe: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};
}
