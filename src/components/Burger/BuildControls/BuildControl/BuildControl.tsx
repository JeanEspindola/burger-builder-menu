import React from 'react'
import classes from './BuildControl.module.scss'
import { FormattedMessage } from 'react-intl'

export interface BuildControlProps {
	disable: boolean
	added: () => void
	removed: () => void
	label: string
}

const BuildControl = (props: BuildControlProps) => (
		<div className={classes.BuildControl}>
			<div className={classes.Label}>{props.label}</div>
			<button
					className={classes.Label}
					onClick={props.removed}
					disabled={props.disable}
					data-testid={`less-${props.label}`}
			>
				<FormattedMessage id="button.less" />
			</button>
			<button
					className={classes.More}
					onClick={props.added}
					data-testid={`more-${props.label}`}
			>
				<FormattedMessage id="button.more" />
			</button>
		</div>
)

export default BuildControl
