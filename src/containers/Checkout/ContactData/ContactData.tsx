import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button'
import { ButtonsEnum } from '../../../utils/constants'
import axios from '../../../axios-orders'
import classes from './ContactData.module.scss'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { FormattedMessage } from 'react-intl'
import { IngredientsType } from '../../../utils/types'
import Input from '../../../components/UI/Input/Input'

interface ContactDataProps {
	ingredients: IngredientsType
	price: number
	history: RouteComponentProps['history']
}

class ContactData extends React.Component<ContactDataProps> {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: 'Jean Espindola',
				validation: {
					required: true,
				},
				valid: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: 'Teststrasse 1',
				validation: {
					required: true,
				},
				valid: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: '81735',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: 'Germany',
				validation: {
					required: true,
				},
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: 'test@test.com',
				validation: {
					required: true,
				},
				valid: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					],
				},
				value: '',
			},
		},
		loading: false,
	}

	// @ts-ignore
	checkValidity = (value, rules) => {
		let isValid = true
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLengthminLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid
	}

	orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		this.setState({ loading: true })

		const formData = {}
		for (let formElementId in this.state.orderForm) {
			// @ts-ignore
			formData[formElementId] = this.state.orderForm[formElementId].value
		}

		console.log(formData)

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}

		axios.post('/orders.json', order)
				.then(response => {
					this.setState({ loading: false })
					this.props.history.push('/')
				})
				.catch(error => {
					this.setState({ loading: false })
				})
	}

	// @ts-ignore
	inputChangedHandler = (event, inputIdentifier) => {
		const updatedForm = { ...this.state.orderForm }
		// @ts-ignore
		const updatedElement = { ...updatedForm[inputIdentifier] }
		updatedElement.value = event.target.value
		updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation)

		// @ts-ignore
		updatedForm[inputIdentifier] = updatedElement
		this.setState({ orderForm: updatedForm})
	}

	render() {
		const formArray = []
		for (let key in this.state.orderForm) {
			formArray.push({
				id: key,
				// @ts-ignore
				config: this.state.orderForm[key],
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
							/>
					))}
					<Button clicked={this.orderHandler} btnType={ButtonsEnum.success}>
						<FormattedMessage id="contactData.order" />
					</Button>
				</form>
		)
		if (this.state.loading) {
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
