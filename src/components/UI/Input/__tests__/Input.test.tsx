import * as React from 'react';
import { screen } from '@testing-library/react';
import Input from '../Input'
import { dummyContactForm } from '../../../../tests/testObjects/dummyContactData'
import { WrappedRender } from '../../../../tests/testUtils'

describe('Input', () => {
	const changed = jest.fn()

	test('renders correctly input text', () => {
		const input = dummyContactForm.name
		const value = 'Jean'
		const labelValue = 'Name'

		WrappedRender(
			<Input
				shouldValidate={input.validation.required}
				invalid={!input.valid}
				elementConfig={input.elementConfig}
				changed={changed}
				elementType={input.elementType}
				value={value}
				touched={input.touched}
				label={labelValue}
			/>,
		)

		const labelElem = screen.getByText(labelValue)
		expect(labelElem).toBeInTheDocument()

		const inputElem = screen.getByDisplayValue(value)
		expect(inputElem).toBeInTheDocument()
	})

	test('renders correctly select option', () => {
		const input = dummyContactForm.deliveryMethod

		WrappedRender(
			<Input
				shouldValidate={input.validation.required}
				invalid={!input.valid}
				elementConfig={input.elementConfig}
				changed={changed}
				elementType={input.elementType}
				touched={input.touched}
				value="Cheapest"
			/>,
		)

		const optionCheapest = screen.getByRole('option', { name: /cheapest/i })
		expect(optionCheapest).toBeInTheDocument()

		const optionFastest = screen.getByRole('option', { name: /fastest/i })
		expect(optionFastest).toBeInTheDocument()
	})
})
