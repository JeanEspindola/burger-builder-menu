import React  from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.scss'
import Toolbar from '../Navigation/Toolbar/Toolbar'

export interface LayoutProps {
	children: React.ReactNode
}

const Layout = (props: LayoutProps) => (
	<Aux>
		<Toolbar />
		<main className={classes.Content}>
			{props.children}
		</main>
	</Aux>
);

export default Layout