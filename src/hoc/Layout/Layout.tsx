import React, { useState } from 'react'
import classes from './Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/rootTypes'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
	const [sideDrawerIsVisible, setSideDrawrerIsVisible] = useState(false)

	const isAuthenticated = useSelector((state: RootStateType) => state.auth.token !== '')

	const sideDrawerClosedHandler = () => {
		setSideDrawrerIsVisible(false)
	}

	const sideDrawerToggleHandler = () => {
		setSideDrawrerIsVisible(!sideDrawerIsVisible)
	}

	return (
		<React.Fragment>
			<Toolbar
					drawerToggleClicked={sideDrawerToggleHandler}
					isAuth={isAuthenticated}
			/>
			<SideDrawer
					open={sideDrawerIsVisible}
					closed={sideDrawerClosedHandler}
					isAuth={isAuthenticated}
			/>
			<main className={classes.Content}>
				{props.children}
			</main>
		</React.Fragment>
	)
}

export default Layout
