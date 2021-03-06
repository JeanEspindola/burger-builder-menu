import React from 'react'
import Modal from 'components/UI/Modal/Modal'
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, } from 'axios'

let reqInterceptor: number
let resInterceptor: number

interface withErrorHandlerStateType {
	error: AxiosError | null
}

const withErrorHandler = <P extends object>(WrappedComponent: React.ComponentType<P>, axios: AxiosInstance) => {
	return class extends React.Component {
		state: Readonly<withErrorHandlerStateType> = {
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
					<React.Fragment>
						<Modal
								show={error !== null}
								modalClosed={this.errorConfirmedHandler}>
							{error?.message}
						</Modal>
						<WrappedComponent {...this.props as P} />
					</React.Fragment>
			)
		}
	}
}

export default withErrorHandler
