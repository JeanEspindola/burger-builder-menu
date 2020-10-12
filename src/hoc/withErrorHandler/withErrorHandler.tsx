import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

// @ts-ignore
const withErrorHandler = (WrappedComponent, axios) => {
	// @ts-ignore
	return class extends React.Component {
		state = {
			error: null,
		}
		componentWillMount() {
			// @ts-ignore
			axios.interceptors.request.use(req => {
				this.setState({ error: null })
				return req
			})

			// @ts-ignore
			axios.interceptors.response.use(res => res, error => {
				this.setState({ error: error })
			})
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render() {
			const show = this.state.error !== null
			// @ts-ignore
			const message = show ? this.state.error.message : ''

			return (
					<Aux>
						<Modal
								show={show}
								modalClosed={this.errorConfirmedHandler}>
							{message}
						</Modal>
						<WrappedComponent {...this.props} />
					</Aux>
			)
		}
	}
}

export default withErrorHandler