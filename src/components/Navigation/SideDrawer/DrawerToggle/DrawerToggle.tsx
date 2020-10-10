import React from 'react'
import classes from './DrawerToggle.module.scss'

export interface DrawerToggleProps {
	clicked: () => void
}

const DrawerToggle = (props: DrawerToggleProps) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
			<div />
			<div />
			<div />
    </div>
)

export default DrawerToggle