import * as React from 'react';
import { screen } from '@testing-library/react';
import { WrappedRender } from 'tests/testUtils'

import BuildControl from '../BuildControl'

describe('BuildControl', () => {
	test('renders correctly', () => {
		const labelText = 'Salad'
		const added = jest.fn()
		const removed = jest.fn()

		WrappedRender(
				<BuildControl
						label={labelText}
						added={added}
						disable={false}
						removed={removed}
				/>,
		)

		const labelElem = screen.getByText(labelText)
		const lessBtn = screen.getByRole('button', { name: /less/i })
		const moreBtn = screen.getByRole('button', { name: /more/i })

		expect(labelElem).toBeInTheDocument()
		expect(lessBtn).toBeInTheDocument()
		expect(moreBtn).toBeInTheDocument()
	})
})
