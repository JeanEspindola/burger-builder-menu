import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import { IntlProvider } from 'react-intl'
import translationMessages from '../../../../i18n/translationMessages'
import Input from '../Input'
import { dummyContactForm } from '../../../../tests/testObjects/dummyContactData'

describe('Input', () => {
	const changed = jest.fn()

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

	test('renders correctly input text', () => {
		const input = dummyContactForm.name
		const value = 'Jean'
		const labelValue = 'Name'

		render(
			// @ts-ignore
			<Input
					shouldValidate={input.validation.required}
					invalid={!input.valid}
					elementConfig={input.elementConfig}
					changed={changed}
					elementType={input.elementType}
					value={value}
					touched={input.touched}
					label={labelValue}
			>
			</Input>,
				// @ts-ignore
				{wrapper: Wrapper})

		const labelElem = screen.getByText(labelValue)
		expect(labelElem).toBeInTheDocument()

		const inputElem = screen.getByDisplayValue(value)
		expect(inputElem).toBeInTheDocument()
	})

	test('renders correctly select option', () => {
		const input = dummyContactForm.deliveryMethod

		render(
				// @ts-ignore
				<Input
						shouldValidate={input.validation.required}
						invalid={!input.valid}
						elementConfig={input.elementConfig}
						changed={changed}
						elementType={input.elementType}
						touched={input.touched}
				>
				</Input>,
				// @ts-ignore
				{wrapper: Wrapper})

		const optionCheapest = screen.getByRole('option', { name: /cheapest/i })
		expect(optionCheapest).toBeInTheDocument()

		const optionFastest = screen.getByRole('option', { name: /fastest/i })
		expect(optionFastest).toBeInTheDocument()
	})
})
