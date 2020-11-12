import React from 'react'
import { Dispatch } from 'redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../../redux/actions/authActions'
import { connect } from 'react-redux'

interface DispatchProps {
	onLogout: () => void
}

interface LogoutProps extends DispatchProps {}

class Logout extends React.Component<LogoutProps> {
	componentDidMount() {
		this.props.onLogout()
	}

	render () {
		return <Redirect to="/" />
	}
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	onLogout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout)
