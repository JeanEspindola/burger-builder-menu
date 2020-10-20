import React from 'react'
import Button from '../../../components/UI/Button/Button'
import { ButtonsEnum } from '../../../utils/constants'
import axios from '../../../axios-orders'
import classes from './ContactData.module.scss'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { FormattedMessage } from 'react-intl'

class ContactData extends React.Component {
	state = {
		name: 'Jean Espindola',
		address: {
			street: 'Teststrasse 1',
			zipCode: '81735',
			country: 'Germany',
		},
		email: 'test@test.com',
		loading: false,
	}


	orderHandler = (event: { preventDefault: () => void }) => {
		event.preventDefault()

		this.setState({ loading: true })
		const order = {
			// @ts-ignore
			ingredients: this.props.ingredients,
			// @ts-ignore
			price: this.props.totalPrice,
			customer: {
				name: 'Jean Espindola',
				address: {
					street: 'Teststrasse 1',
					zipCode: '81735',
					country: 'Germany',
				},
				email: 'test@test.com'
			},
			deliveryMethod: 'fastest',
		}

		axios.post('/orders.json', order)
				.then(response => {
					this.setState({ loading: false })
					// @ts-ignore
					this.props.history.push('/')
				})
				.catch(error => {
					this.setState({ loading: false })
				})
	}

	render() {
		// TODO: Add hooks for react-intl
		let form = (
				<form>
					<input className={classes.Input} type="text" name="name" placeholder="Your Name" />
					<input className={classes.Input} type="email" name="email" placeholder="Your Email" />
					<input className={classes.Input} type="text" name="street" placeholder="Street" />
					<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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