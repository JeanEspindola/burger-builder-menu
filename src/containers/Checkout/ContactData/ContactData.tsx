import React from 'react'
import Button from '../../../components/UI/Button/Button'
import { ButtonsEnum } from '../../../utils/constants'
import axios from '../../../axios-orders'
import classes from './ContactData.module.scss'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { FormattedMessage } from 'react-intl'
import Input from '../../../components/UI/Input/Input'
import { ContactDataProps, ContactDataStateType, FormInputValidation } from './ContactDataTypes'

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
		loading: false,
	}

	checkValidity = (value: string, rules: FormInputValidation) => {
		let isValid = true
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid
	}

	orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		const { orderForm } = this.state
		const { ingredients, price, history } = this.props

		this.setState({ loading: true })

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

		axios.post('/orders.json', order)
				.then(response => {
					this.setState({ loading: false })
					history.push('/')
				})
				.catch(error => {
					this.setState({ loading: false })
				})
	}

	inputChangedHandler = (event: { target: { value: string } }, inputIdentifier: string) => {
		const updatedForm = { ...this.state.orderForm }

		const updatedElement = { ...updatedForm[inputIdentifier] }
		updatedElement.value = event.target.value
		updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)
		updatedElement.touched = true

		let formIsValid = true
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid
		}

		updatedForm[inputIdentifier] = updatedElement
		this.setState({ orderForm: updatedForm, formValid: formIsValid})
	}

	render() {
		const { orderForm, loading, formValid } = this.state
		const formArray = []
		for (let key in orderForm) {
			formArray.push({
				id: key,
				config: orderForm[key],
			})
		}

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

export default ContactData
