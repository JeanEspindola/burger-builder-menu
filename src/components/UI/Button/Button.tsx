import React from 'react'
import classes from './Button.module.scss'

interface ButtonProps {
	disabled?: boolean
	children: React.ReactNode
	clicked?: (event?: { preventDefault: () => void }) => void
	btnType: string
}

const Button = (props: ButtonProps) => (
    <button
				onClick={props.clicked}
				disabled={props.disabled}
				className={[classes.Button, classes[props.btnType]].join(' ')}
		>
			{props.children}
		</button>
)

export default Button
