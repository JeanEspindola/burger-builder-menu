import React  from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.scss'

export interface LayoutProps {
	children: React.ReactNode
}

const Layout = (props: LayoutProps) => (
	<Aux>
		<div>Toolbar, SideDrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</Aux>
);

export default Layout