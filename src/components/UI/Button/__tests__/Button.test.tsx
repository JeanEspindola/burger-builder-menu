import * as React from 'react';
import { screen, render  } from '@testing-library/react';
import Button from '../Button'
import { ButtonsEnum } from '../../../../utils/constants'

describe('Button', () => {
	test('renders correctly', () => {
		const text = 'Danger'

		render(
			<Button btnType={ButtonsEnum.danger} disabled={true}>
				{text}
			</Button>
		)

		const button = screen.getByRole('button', {name: text})
		expect(button).toBeInTheDocument()
	})
})
