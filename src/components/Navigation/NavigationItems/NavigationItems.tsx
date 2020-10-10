import React from 'react'
import classes from './NavigationItems.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'

export interface NavigationItemsProps {}

const NavigationItems = (props: NavigationItemsProps) => (
    <ul className={classes.NavigationItems}>
			<NavigationItem link="/" active>Burger Builder</NavigationItem>
			<NavigationItem link="/">Checkout</NavigationItem>
		</ul>
)

export default NavigationItems