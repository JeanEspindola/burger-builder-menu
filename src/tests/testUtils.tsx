import React from 'react';
import { render } from '@testing-library/react';
import translationMessages from '../i18n/translationMessages'
import { MemoryRouter } from 'react-router'
import { IntlProvider } from 'react-intl'
import { RootStateType } from '../redux/rootTypes'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { History, LocationState } from 'history';

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

export const renderRouteComponent = (component: React.ReactElement, store: any, history: History<LocationState>) => (
	render(
			<Provider store={store}>
				<IntlProvider
						key="en"
						locale="en"
						defaultLocale="en"
						messages={translationMessages['en']}
				>
					<Router history={history}>
						{component}
					</Router>
				</IntlProvider>
			</Provider>
	)
)

export const createDummyStore = (state: RootStateType) => {
	return {
		dispatch: jest.fn(),
		getState: () => state,
		subscribe: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};
}

export const mockApi = (
		apiMethod: Function,
		statusCode: number,
		response: Record<string, any>,
) => {
	const mockedAPI = apiMethod as jest.Mock;
	mockedAPI.mockClear();

	if (statusCode === 200) {
		mockedAPI.mockResolvedValue({ ...response });
	} else {
		mockedAPI.mockRejectedValue(response);
	}
	return mockedAPI;
};

export interface TestDispatchType<T> {
	type?: string;
	payload?: T;
}
