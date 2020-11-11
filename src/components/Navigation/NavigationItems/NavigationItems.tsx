import React from 'react'
import classes from './NavigationItems.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'
import { FormattedMessage } from 'react-intl'

export interface NavigationItemsProps {
	isAuthenticated: boolean
}

const NavigationItems = (props: NavigationItemsProps) => (
    <ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				<FormattedMessage id="menu.burgerBuilder" />
			</NavigationItem>
			<NavigationItem link="/orders">
				<FormattedMessage id="menu.orders" />
			</NavigationItem>
			{!props.isAuthenticated
					? <NavigationItem link="/auth">
						<FormattedMessage id="menu.authenticate"/>
					</NavigationItem>
					:<NavigationItem link="/logout">
						<FormattedMessage id="menu.logout"/>
					</NavigationItem>
			}
		</ul>
)

export default NavigationItems
