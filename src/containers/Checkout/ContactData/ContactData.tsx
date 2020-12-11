import React, { useState } from 'react'
import Button from 'components/UI/Button/Button'
import { ButtonsEnum } from 'utils/constants'
import axios from 'axios-orders'
import classes from './ContactData.module.scss'
import Spinner from 'components/UI/Spinner/Spinner'
import { FormattedMessage } from 'react-intl'
import Input from 'components/UI/Input/Input'
import { OrderFormElement } from './ContactDataTypes'
import { useDispatch, useSelector } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { purchaseBurger } from '../../../redux/actions/orderActions'
import { RootStateType } from '../../../redux/rootTypes'
import { RouteComponentProps } from 'react-router-dom'
import { checkValidity, createFormArray } from '../../../utils/helper'
import { dummyContactForm } from '../../../tests/testObjects/dummyContactData'

interface ContactDataProps {
	history?: RouteComponentProps['history']
}

const ContactData = (props: ContactDataProps) => {
	const [customerForm, setCustomerForm] = useState<OrderFormElement>(dummyContactForm)
	const [formValid, setFormIsValid] = useState<boolean>(false)

	const dispatch = useDispatch()
	//TODO: check typing
	const onPurchaseBurgerStart = (orderData: any, token: string) => dispatch(purchaseBurger(orderData, token))

	const { ingredients, totalPrice } = useSelector((state: RootStateType) => state.burgerBuilder)
	const { token, userId } = useSelector((state: RootStateType) => state.auth)
	const loading = useSelector((state: RootStateType) => state.order.loading)

	const orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		const formData = {}

		for (let formElementId in customerForm) {
			// @ts-ignore
			formData[formElementId] = customerForm[formElementId].value
		}

		const order = {
			ingredients,
			userId,
			price: totalPrice,
			orderData: formData,
		}

		onPurchaseBurgerStart(order, token)
	}

	const inputChangedHandler = (event: { target: { value: string } }, inputIdentifier: string) => {
		const updatedForm = { ...customerForm }

		const updatedElement = { ...updatedForm[inputIdentifier] }
		updatedElement.value = event.target.value
		updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
		updatedElement.touched = true

		let formIsValid = true
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid
		}

		updatedForm[inputIdentifier] = updatedElement
		setCustomerForm(updatedForm)
		setFormIsValid(formIsValid)
	}

	const formArray = createFormArray(customerForm)

	let form = (
			<form onSubmit={orderHandler}>
				{formArray.map(formElement => (
						<Input key={formElement.id}
									 changed={(event) => inputChangedHandler(event, formElement.id)}
									 elementType={formElement.config.elementType}
									 elementConfig={formElement.config.elementConfig}
									 value={formElement.config.value}
									 invalid={!formElement.config.valid}
									 shouldValidate={formElement.config.validation.required}
									 touched={formElement.config.touched}
						/>
				))}
				<Button
						clicked={orderHandler}
						btnType={ButtonsEnum.success}
						disabled={!formValid}
				>
					<FormattedMessage id="contactData.order" />
				</Button>
			</form>
	)
	if (loading) {
		form = <Spinner />
	}

	return(
		<div className={classes.ContactData}>
			<h4>
				<FormattedMessage id="contactData.title" />
			</h4>
			{form}
		</div>
	)
}

export default withErrorHandler(ContactData, axios)
