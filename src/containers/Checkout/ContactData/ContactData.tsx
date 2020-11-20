import React from 'react'
import Button from 'components/UI/Button/Button'
import { ButtonsEnum } from 'utils/constants'
import axios from 'axios-orders'
import classes from './ContactData.module.scss'
import Spinner from 'components/UI/Spinner/Spinner'
import { FormattedMessage } from 'react-intl'
import Input from 'components/UI/Input/Input'
import { ContactDataStateType } from './ContactDataTypes'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { Dispatch } from 'redux'
import { purchaseBurger } from '../../../redux/actions/orderActions'
import { RootStateTypes } from '../../../redux/rootTypes'
import { IngredientsType } from '../../../utils/types'
import { RouteComponentProps } from 'react-router-dom'
import { checkValidity, createFormArray } from '../../../utils/helper'
import { dummyContactForm } from '../../../../tests/testObjects/dummyContactData'

interface Props {
	ingredients: IngredientsType
	price: number
	loading: boolean
	token: string
	userId: string
}

interface DispatchProps {
	onPurchaseBurgerStart: (order: any, token: string) => void
}

interface ContactDataProps extends Props, DispatchProps{
	history: RouteComponentProps['history']
}

class ContactData extends React.Component<ContactDataProps> {
	state: Readonly<ContactDataStateType> = {
		orderForm: dummyContactForm,
		formValid: false,
	}

	orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		const { orderForm } = this.state
		const { ingredients, price, onPurchaseBurgerStart, token, userId } = this.props

		const formData = {}

		for (let formElementId in orderForm) {
			// @ts-ignore
			formData[formElementId] = orderForm[formElementId].value
		}

		const order = {
			ingredients,
			price,
			userId,
			orderData: formData,
		}

		onPurchaseBurgerStart(order, token)
	}

	inputChangedHandler = (event: { target: { value: string } }, inputIdentifier: string) => {
		const updatedForm = { ...this.state.orderForm }

		const updatedElement = { ...updatedForm[inputIdentifier] }
		updatedElement.value = event.target.value
		updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
		updatedElement.touched = true

		let formIsValid = true
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid
		}

		updatedForm[inputIdentifier] = updatedElement
		this.setState({ orderForm: updatedForm, formValid: formIsValid})
	}

	render() {
		const { orderForm, formValid } = this.state
		const { loading } = this.props

		const formArray = createFormArray(orderForm)

		// TODO: Add hooks for react-intl
		let form = (
				<form onSubmit={this.orderHandler}>
					{formArray.map(formElement => (
							<Input key={formElement.id}
										 changed={(event) => this.inputChangedHandler(event, formElement.id)}
										 elementType={formElement.config.elementType}
										 elementConfig={formElement.config.elementConfig}
										 value={formElement.config.value}
										 invalid={!formElement.config.valid}
										 shouldValidate={formElement.config.validation.required}
										 touched={formElement.config.touched}
							/>
					))}
					<Button
							clicked={this.orderHandler}
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
}

const mapStateToProps = (state: RootStateTypes): Props => ({
	ingredients: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onPurchaseBurgerStart: (orderData, token: string) => dispatch(purchaseBurger(orderData, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
