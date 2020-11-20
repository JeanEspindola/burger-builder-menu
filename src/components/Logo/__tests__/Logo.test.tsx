import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import Logo from '../Logo'

describe('Logo', () => {
	test('renders correctly', () => {

		render(<Logo />)

		const img = screen.getByRole('img', { name: /myburger/i })
		expect(img).toBeInTheDocument()
	})
})
