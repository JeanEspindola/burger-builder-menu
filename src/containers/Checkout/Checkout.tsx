import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { IngredientsType } from '../../utils/types'

export interface CheckoutProps {
	history: RouteComponentProps['history']
	location: RouteProps['location']
	match: {
		path: RouteProps['path']
	}
}

class Checkout extends React.Component<CheckoutProps> {
	state = {
		ingredients: {},
		totalPrice: 0,
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location?.search)
		const ingredients: IngredientsType = {}
		let price = 0

		// @ts-ignore
		for (let param of query.entries()) {
			if (param[0] === 'price') {
					price = param[1]
			} else {
				ingredients[param[0]] = Number(param[1])
			}

		}

		this.setState({ ingredients: ingredients, totalPrice: price })
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
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
					<Route
							path={this.props.match.path + '/contact-data'}
							render={(props) => (
									<ContactData
											ingredients={this.state.ingredients}
											price={this.state.totalPrice}
											{...props}/>
									)}
					/>
				</div>
		)
	}
}

export default Checkout
