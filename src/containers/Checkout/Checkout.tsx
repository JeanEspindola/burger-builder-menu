import React from 'react'
import { Route, RouteProps, RouteComponentProps, Redirect } from 'react-router-dom'
import CheckoutSummary from 'components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { IngredientsType } from '../../utils/types'
import { RootStateTypes } from '../../redux/rootTypes'

export interface CheckoutProps {
	history: RouteComponentProps['history']
	location: RouteProps['location']
	match: {
		path: RouteProps['path']
	},
	ingredients: IngredientsType,
}

class Checkout extends React.Component<CheckoutProps> {
	checkoutCancelledHandler = () => {
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		const { ingredients, match } = this.props

		let summary = <Redirect to="/" />

		if (Object.keys(ingredients).length > 0) {
			summary = (
					<div>
						<CheckoutSummary
								ingredients={ingredients}
								checkoutCancelled={this.checkoutCancelledHandler}
								checkoutContinued={this.checkoutContinuedHandler}
						/>
						<Route
								path={match.path + '/contact-data'}
								component={ContactData}
						/>
					</div>
			)
		}

		return summary
	}
}

const mapStateToProps = (state: RootStateTypes) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
	}
}

export default connect(mapStateToProps, null)(Checkout)
