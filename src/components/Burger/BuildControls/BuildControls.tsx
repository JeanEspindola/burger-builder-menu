import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import { IngredientsLabel, IngredientsType } from '../../../utils/constants'

export interface BuildControlsProps {
	//TODO: type
	disabled: any
	ingredientAdded(type: IngredientsType): void
	ingredientRemoved(type: IngredientsType): void
}

const controls = [
	{ label: IngredientsLabel.salad, type: IngredientsType.salad },
	{ label: IngredientsLabel.bacon, type: IngredientsType.bacon },
	{ label: IngredientsLabel.meat, type: IngredientsType.meat },
	{ label: IngredientsLabel.cheese, type: IngredientsType.cheese },
]

const BuildControls = (props: BuildControlsProps) => (
	<div className={classes.BuildControls}>
		{controls.map(ctrl => (
				<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientRemoved(ctrl.type)}
						disable={props.disabled[ctrl.type]}
				/>
		))}
	</div>
)

export default BuildControls