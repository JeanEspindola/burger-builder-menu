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

interface AuthStateType {
	controls: OrderFormElement
}

interface DispatchProps {
	onAuth: (email: string, password: string) => void
}

interface AuthProps extends DispatchProps {}

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
		}
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

		const { controls: {  email, password} } = this.state
		const { onAuth } = this.props

		onAuth(email.value, password.value)
	}

	render() {
		const { controls } = this.state
		const formArray = createFormArray(controls)

		const form = formArray.map(formElement => (
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

		return (
				<div className={classes.Auth}>
					<form onSubmit={this.submitHandler}>
						{form}
						<Button btnType={ButtonsEnum.success}>
							<FormattedMessage id="auth.submit" />
						</Button>
					</form>
				</div>
		)
	}
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onAuth: (email: string, password: string) => dispatch(auth(email, password))
})

export default connect(null, mapDispatchToProps)(Auth)
