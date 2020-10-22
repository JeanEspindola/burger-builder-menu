import React from 'react'
import classes from './Input.module.scss'

interface InputProps {
	elementType: string
	changed: (event: any) => void
	value: string
	label?: string
	elementConfig: any
}

const Input = (props: InputProps) => {
	let inputElement = null

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
					onChange={props.changed}
			/>
			break
		case ('textarea'):
			inputElement = <textarea
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
					onChange={props.changed}
			/>
			break
		case ('select'):
			inputElement = (
					<select
						className={classes.InputElement}
						value={props.value}
						{...props.elementConfig}
						onChange={props.changed}
					>
						{ /* @ts-ignore */ }
						{props.elementConfig.options.map(option => (
								<option key={option.value} value={option.value}>
									{option.displayValue}
								</option>
						))}
					</select>
			)
			break
		default:
			inputElement = <input
					className={classes.InputElement}
					value={props.value}
					{...props.elementConfig}
					onChange={props.changed}
			/>
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input
