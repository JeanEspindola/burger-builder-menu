import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { ButtonsEnum } from '../../utils/constants'
import classes from './Auth.module.scss'
import { OrderFormElement } from '../Checkout/ContactData/ContactDataTypes'
import { Redirect } from 'react-router-dom'
import { auth, setAuthRedirectPath } from '../../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { checkValidity, createFormArray } from '../../utils/helper'
import Spinner from '../../components/UI/Spinner/Spinner'
import { RootStateType } from '../../redux/rootTypes'
import { dummyAuthData } from '../../tests/testObjects/dummyAuthData'
import { HistoryProps } from '../Checkout/Checkout'

const Auth = (props: HistoryProps) => {
	const [authForm, setAuthForm] = useState<OrderFormElement>(dummyAuthData)
	const [isSignup, setIsSignup] = useState<boolean>(true)

	const dispatch = useDispatch()

	const onSetAuthRedirectPath = useCallback(() => dispatch(setAuthRedirectPath('/')), [dispatch])
	const onAuth = (email: string, password: string, isSignup: boolean) => dispatch(auth(email, password, isSignup))

	const { loading, error, authRedirectPath } = useSelector((state: RootStateType) => state.auth)
	const isAuthenticated = useSelector((state: RootStateType) => state.auth.token !== '')
	const { building } = useSelector((state: RootStateType) => state.burgerBuilder)

	useEffect(() => {
		if (!building && authRedirectPath !== '/') {
			onSetAuthRedirectPath()
		}
	}, [building, authRedirectPath, onSetAuthRedirectPath])

	const inputChangedHandler = (event: { target: { value: string } }, controlName: string) => {
		const newValue = event.target.value
		const updatedControls = {
			...authForm,
			[controlName]: {
				...authForm[controlName],
				value: newValue,
				valid: checkValidity(newValue, authForm[controlName].validation),
				touched: true,
			}
		}

		setAuthForm(updatedControls)
	}

	const submitHandler = (event: FormEvent<HTMLElement>) => {
		event.preventDefault()
		const { email, password } = authForm
		onAuth(email.value, password.value, isSignup)
	}

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup)
	}

	const formArray = createFormArray(authForm)

	let form: React.ReactNode = formArray.map(formElement => (
			<Input key={formElement.id}
						 changed={(event) => inputChangedHandler(event, formElement.id)}
						 elementType={formElement.config.elementType}
						 elementConfig={formElement.config.elementConfig}
						 value={formElement.config.value}
						 invalid={!formElement.config.valid}
						 shouldValidate={formElement.config.validation.required}
						 touched={formElement.config.touched}
			/>
	))

	if (loading) {
		form = <Spinner />
	}

	let errorMessage: React.ReactNode
	if (error !== '') {
		errorMessage = (
				<p>{error}</p>
		)
	}

	let authRedirect: React.ReactNode
	if (isAuthenticated) {
		authRedirect = <Redirect to={authRedirectPath} />
	}

	return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={submitHandler}>
					{form}
					<Button btnType={ButtonsEnum.success}>
						<FormattedMessage id="auth.submit" />
					</Button>
				</form>
				<Button
						btnType={ButtonsEnum.danger}
						clicked={switchAuthModeHandler}
				>
					<FormattedMessage id={isSignup ? 'auth.switchToSignin' : 'auth.switchToSignup'} />
				</Button>
			</div>
	)
}

export default Auth
