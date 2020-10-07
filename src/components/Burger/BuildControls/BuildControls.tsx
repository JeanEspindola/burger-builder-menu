import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import { IngredientsLabel, IngredientsEnum } from '../../../utils/constants'

export interface BuildControlsProps {
	//TODO: type
	disabled: any
	ingredientAdded(type: IngredientsEnum): void
	ingredientRemoved(type: IngredientsEnum): void
	price: number
	purchasable: boolean
}

const controls = [
	{ label: IngredientsLabel.salad, type: IngredientsEnum.salad },
	{ label: IngredientsLabel.bacon, type: IngredientsEnum.bacon },
	{ label: IngredientsLabel.cheese, type: IngredientsEnum.cheese },
	{ label: IngredientsLabel.meat, type: IngredientsEnum.meat },
]

const BuildControls = (props: BuildControlsProps) => (
	<div className={classes.BuildControls}>
		<p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
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
		>
			ORDER NOW
		</button>
	</div>
)

export default BuildControls