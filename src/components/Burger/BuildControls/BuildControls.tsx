import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import { IngredientsLabel, IngredientsEnum } from '../../../utils/constants'
import { DisableInfoType } from '../../../utils/types'
import { FormattedMessage } from 'react-intl'

export interface BuildControlsProps {
	disabled: DisableInfoType
	ingredientAdded: (type: IngredientsEnum) => void
	ingredientRemoved: (type: IngredientsEnum) => void
	ordered: () => void
	price: number
	purchasable: boolean
}

const controls = [
	{ label: IngredientsLabel.bacon, type: IngredientsEnum.bacon },
	{ label: IngredientsLabel.cheese, type: IngredientsEnum.cheese },
	{ label: IngredientsLabel.meat, type: IngredientsEnum.meat },
	{ label: IngredientsLabel.salad, type: IngredientsEnum.salad },
]

const BuildControls = (props: BuildControlsProps) => (
	<div className={classes.BuildControls}>
		<p>
			<FormattedMessage id="menu.price" />
			<strong>
				{` `}{props.price.toFixed(2)}
			</strong>
		</p>
		{controls.map(ctrl => (
				<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientRemoved(ctrl.type)}
						disable={props.disabled[ctrl.type]}
				/>
		))}
		<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}
		>
			<FormattedMessage id="menu.order" />
		</button>
	</div>
)

export default BuildControls