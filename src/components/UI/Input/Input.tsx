import React from 'react'
import classes from './Input.module.scss'

interface InputProps {
	shouldValidate: boolean
	invalid: boolean
	touched?: boolean
	elementType: string
	changed: (event: any) => void
	value: string
	label?: string
	elementConfig: any
}

const Input = (props: InputProps) => {
	let inputElement = null
	const inputClasses = [classes.InputElement]

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
					className={inputClasses.join(' ')}
					value={props.value}
					{...props.elementConfig}
					onChange={props.changed}
			/>
			break
		case ('textarea'):
			inputElement = <textarea
					className={inputClasses.join(' ')}
					value={props.value}
					{...props.elementConfig}
					onChange={props.changed}
			/>
			break
		case ('select'):
			inputElement = (
					<select
						className={inputClasses.join(' ')}
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
					className={inputClasses.join(' ')}
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
