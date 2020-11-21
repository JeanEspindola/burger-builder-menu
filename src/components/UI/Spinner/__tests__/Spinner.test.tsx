import * as React from 'react';
import { screen } from '@testing-library/react';
import Spinner from '../Spinner'
import { WrappedRender } from '../../../../tests/testUtils'

describe('Spinner', () => {
	test('renders correctly', () => {
		WrappedRender(<Spinner />)

		const text = screen.getByText('Loading...')

		expect(text).toBeInTheDocument()
	})
})
