import React from 'react'
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom'
import CheckoutSummary from 'components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { InitialStateType } from '../../store/reducer'
import { IngredientsType } from '../../utils/types'

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
		return(
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
}

const mapStateToProps = (state: InitialStateType) => {
	return {
		ingredients: state.ingredients,
	}
}

export default connect(mapStateToProps, null)(Checkout)
