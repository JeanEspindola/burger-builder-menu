import React from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.module.scss'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

export interface LayoutProps {
	children: React.ReactNode
}

export interface LayoutState {
	showSideDrawer: boolean
}

class Layout extends React.Component<LayoutProps> {
	state: LayoutState = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState: LayoutState) => {

			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	render () {
		return (
				<Aux>
					<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
					<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</Aux>
		)
	}
}

export default Layout