import React from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { ButtonsEnum } from '../../utils/constants'
import classes from './Auth.module.scss'
import { OrderFormElement } from '../Checkout/ContactData/ContactDataTypes'
import { Dispatch } from 'redux'
import { auth } from '../../redux/actions/authActions'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { checkValidity, createFormArray } from '../../utils/helper'
import Spinner from '../../components/UI/Spinner/Spinner'
import { RootStateTypes } from '../../redux/rootTypes'

interface AuthStateType {
	controls: OrderFormElement
	isSignup: boolean
}

interface Props {
	loading: boolean
	error: string
}

interface DispatchProps {
	onAuth: (email: string, password: string, isSignup: boolean) => void
}

interface AuthProps extends DispatchProps, Props {}

class Auth extends React.Component<AuthProps> {
	state: AuthStateType = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	}

	inputChangedHandler = (event: { target: { value: string } }, controlName: string) => {
		const newValue = event.target.value
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: newValue,
				valid: checkValidity(newValue, this.state.controls[controlName].validation),
				touched: true,
			}
		}

		this.setState({controls: updatedControls})
	}

	submitHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		const { controls: {  email, password}, isSignup } = this.state
		const { onAuth } = this.props

		onAuth(email.value, password.value, isSignup)
	}

	switchAuthModeHandler = () => {
		this.setState((prevState: AuthStateType) => {
			return {isSignup: !prevState.isSignup}
		})
	}

	render() {
		const { controls, isSignup } = this.state
		const { loading, error } = this.props
		const formArray = createFormArray(controls)

		let form = formArray.map(formElement => (
				<Input key={formElement.id}
							 changed={(event) => this.inputChangedHandler(event, formElement.id)}
							 elementType={formElement.config.elementType}
							 elementConfig={formElement.config.elementConfig}
							 value={formElement.config.value}
							 invalid={!formElement.config.valid}
							 shouldValidate={formElement.config.validation.required}
							 touched={formElement.config.touched}
				/>
		))

		if (loading) {
			// @ts-ignore
			form = <Spinner />
		}

		// @ts-ignore
		let errorMessage: JSX.Element = null
		if (error !== '') {
			errorMessage = (
					<p>{error}</p>
			)
		}

		return (
				<div className={classes.Auth}>
					{errorMessage}
					<form onSubmit={this.submitHandler}>
						{form}
						<Button btnType={ButtonsEnum.success}>
							<FormattedMessage id="auth.submit" />
						</Button>
					</form>
					<Button
							btnType={ButtonsEnum.danger}
							clicked={this.switchAuthModeHandler}
					>
						Switch to {isSignup ? 'Signin' : 'Signup'}
					</Button>
				</div>
		)
	}
}

const mapStateToProps = (state: RootStateTypes): Props => ({
	loading: state.auth.loading,
	error: state.auth.error,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onAuth: (email: string, password: string, isSignup: boolean) => dispatch(auth(email, password, isSignup))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
