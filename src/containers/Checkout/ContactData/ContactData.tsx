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

interface Props {
	ingredients: IngredientsType
	price: number
	loading: boolean
}

interface DispatchProps {
	onPurchaseBurgerStart: (order: any) => void
}

interface ContactDataProps extends Props, DispatchProps{
	history: RouteComponentProps['history']
}

class ContactData extends React.Component<ContactDataProps> {
	state: ContactDataStateType = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					],
				},
				valid: true,
				validation: {
					required: false,
				},
				value: 'fastest',
			},
		},
		formValid: false,
	}

	orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		const { orderForm } = this.state
		const { ingredients, price, onPurchaseBurgerStart } = this.props

		const formData = {}

		for (let formElementId in orderForm) {
			// @ts-ignore
			formData[formElementId] = orderForm[formElementId].value
		}

		const order = {
			ingredients,
			price,
			orderData: formData,
		}

		onPurchaseBurgerStart(order)
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
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onPurchaseBurgerStart: (orderData) => dispatch(purchaseBurger(orderData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
