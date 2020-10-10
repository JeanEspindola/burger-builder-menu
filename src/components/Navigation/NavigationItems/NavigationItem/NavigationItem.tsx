import React from 'react'
import classes from './NavigationItem.module.scss'

export interface NavigationItemProps {
	children: React.ReactNode
	active?: boolean
	link: string
}

const NavigationItem = (props: NavigationItemProps) => (
		<li className={classes.NavigationItem}>
			<a
					href={props.link}
					className={props.active ? classes.active : ''}>
				{props.children}
			</a>
		</li>
)

export default NavigationItem