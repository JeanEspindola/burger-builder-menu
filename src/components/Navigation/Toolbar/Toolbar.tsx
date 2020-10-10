import React from 'react'
import classes from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

// @ts-ignore
const Toolbar = (props) => (
		<header className={classes.Toolbar}>
			<div>MENU</div>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
)

export default Toolbar