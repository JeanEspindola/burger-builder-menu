import React from 'react'
import classes from './Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
import { RootStateTypes } from '../../redux/rootTypes'

interface Props {
	isAuthenticated: boolean
}

interface LayoutProps {
	children: React.ReactNode
}

interface LayoutState {
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
		// @ts-ignore
		const { isAuthenticated } = this.props
		return (
				<React.Fragment>
					<Toolbar
							drawerToggleClicked={this.sideDrawerToggleHandler}
							isAuth={isAuthenticated}
					/>
					<SideDrawer
							open={this.state.showSideDrawer}
							closed={this.sideDrawerClosedHandler}
							isAuth={isAuthenticated}
					/>
					<main className={classes.Content}>
						{this.props.children}
					</main>
				</React.Fragment>
		)
	}
}

const mapStateToProps = (state: RootStateTypes): Props => ({
	isAuthenticated: state.auth.token !== '',
})

export default connect(mapStateToProps, null)(Layout)
