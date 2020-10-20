import React from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// @ts-ignore
class Checkout extends React.Component {
	state = {
		ingredients: {},
		totalPrice: 0,
	}

	componentDidMount() {
		// @ts-ignore
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		let price = 0

		// @ts-ignore
		for (let param of query.entries()) {
			// @ts-ignore
			if (param[0] === 'price') {
					price = param[1]
			} else {
				// @ts-ignore
				ingredients[param[0]] = Number(param[1])
			}

		}

		this.setState({ ingredients: ingredients, totalPrice: price })
	}

	checkoutCancelledHandler = () => {
		// @ts-ignore
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		// @ts-ignore
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return(
				<div>
					<CheckoutSummary
							ingredients={this.state.ingredients}
							checkoutCancelled={this.checkoutCancelledHandler}
							checkoutContinued={this.checkoutContinuedHandler}
					/>
					{ /* @ts-ignore */ }
					<Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/>
				</div>
		)
	}
}

export default Checkout
