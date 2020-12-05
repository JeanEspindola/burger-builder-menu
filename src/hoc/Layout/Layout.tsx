import React, { useState } from 'react'
import classes from './Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/rootTypes'

interface Props {
	isAuthenticated: boolean
}

interface LayoutProps {
	children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
	const [sideDrawerIsVisible, setSideDrawrerIsVisible] = useState(false)

	const sideDrawerClosedHandler = () => {
		setSideDrawrerIsVisible(false)
	}

	const sideDrawerToggleHandler = () => {
		setSideDrawrerIsVisible(!sideDrawerIsVisible)
	}

	// @ts-ignore
	const { isAuthenticated } = props

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

const mapStateToProps = (state: RootStateType): Props => ({
	isAuthenticated: state.auth.token !== '',
})

export default connect(mapStateToProps, null)(Layout)
