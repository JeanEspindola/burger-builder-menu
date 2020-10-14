import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios'
import { withErrorHandlerStateType } from '../../utils/types'

let reqInterceptor: number
let resInterceptor: number

const withErrorHandler = <P extends object>(WrappedComponent: React.ComponentType<P>, axios: AxiosInstance) => {
	return class extends React.Component {
		state: withErrorHandlerStateType = {
			error: null,
		}

		componentWillMount() {
			reqInterceptor =	axios.interceptors.request.use((req: AxiosRequestConfig) => {
				this.setState({ error: null })
				return req
			})

			resInterceptor = axios.interceptors.response.use((res: AxiosResponse) => res, (error: AxiosError) => {
				this.setState({ error: error })
			})
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(reqInterceptor)
			axios.interceptors.response.eject(resInterceptor)
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render() {
			const { error } = this.state

			return (
					<Aux>
						<Modal
								show={error !== null}
								modalClosed={this.errorConfirmedHandler}>
							{error?.message}
						</Modal>
						<WrappedComponent {...this.props as P} />
					</Aux>
			)
		}
	}
}

export default withErrorHandler