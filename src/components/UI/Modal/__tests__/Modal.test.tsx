import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import Modal from '../Modal'

describe('Modal', () => {
	const modal = 'Modal'
	const func = jest.fn()

	test('renders correctly show modal', () => {
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

	test('renders correctly hidden modal', () => {
		render(
			<Modal show={false} modalClosed={func} >
				{modal}
			</Modal>
		)

		const text = screen.getByText(modal)
		expect(text).toBeInTheDocument()
		expect(text.closest('div')).toHaveStyle(`
			transform: translateY(-100vh);
		 	opacity: 0;
		`)
	})
})
