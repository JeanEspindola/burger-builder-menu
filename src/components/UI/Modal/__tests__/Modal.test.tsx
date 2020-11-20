import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import Modal from '../Modal'

describe('Modal', () => {
	test('renders correctly', () => {
		const modal = 'Modal'
		const func = jest.fn()

		render(
			<Modal show={true} modalClosed={func} >
				{modal}
			</Modal>
		)

		const text = screen.getByText(modal)
		expect(text).toBeInTheDocument()
		expect(text.closest('div')).toHaveStyle(`
			transform: translateY(0);
		 	opacity: 1;
		`)
	})
})
