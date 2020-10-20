import React from 'react'
import classes from './Button.module.scss'

export interface ButtonProps {
	children: React.ReactNode
	// TODO: type here
	clicked: (arg?: any) => void
	btnType: string
}

const Button = (props: ButtonProps) => (
    <button
				onClick={props.clicked}
				className={[classes.Button, classes[props.btnType]].join(' ')}
		>
			{props.children}
		</button>
)

export default Button
