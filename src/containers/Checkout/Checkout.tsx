import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'
import CheckoutSummary from 'components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

export interface CheckoutProps {
	history: RouteComponentProps['history']
	location: RouteProps['location']
	match: {
		path: RouteProps['path']
	}
}

class Checkout extends React.Component<CheckoutProps> {
	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		// @ts-ignore
		const { ingredients} = this.props
		return(
				<div>
					<CheckoutSummary
							ingredients={ingredients}
							checkoutCancelled={this.checkoutCancelledHandler}
							checkoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
							path={this.props.match.path + '/contact-data'}
							component={ContactData}
					/>
				</div>
		)
	}
}

// @ts-ignore
const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
	}
}

export default connect(mapStateToProps, null)(Checkout)
