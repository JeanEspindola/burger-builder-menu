import React from 'react'
import classes from './Button.module.scss'

export interface ButtonProps {
	children: React.ReactNode
	clicked: (event?: { preventDefault: () => void }) => void
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
