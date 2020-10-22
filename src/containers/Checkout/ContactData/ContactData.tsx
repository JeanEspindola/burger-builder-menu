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
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: 'Teststrasse 1',
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: '81735',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: 'Germany',
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: 'test@test.com',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'},
					],
				}
			},
		},
		loading: false,
	}

	orderHandler = (event?: { preventDefault: () => void }) => {
		event?.preventDefault()

		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
				<form>
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
