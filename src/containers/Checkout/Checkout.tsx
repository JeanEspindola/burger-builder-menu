import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { Location, History } from 'history';
import CheckoutSummary from 'components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import { IngredientsType } from '../../utils/types'
import { RootStateType } from '../../redux/rootTypes'

interface Props {
	ingredients: IngredientsType,
	purchased: boolean
}

export interface CheckoutProps extends Props {
	history?: History
	location: Location
	match: {
		path: RouteProps['path']
	},
}

const Checkout = (props: CheckoutProps) => {
	const checkoutCancelledHandler = () => {
		props.history?.goBack()
	}

	const checkoutContinuedHandler = () => {
		props.history?.replace('/checkout/contact-data')
	}

	const { ingredients, match, purchased } = props

	let summary = <Redirect to="/" />

	if (Object.keys(ingredients).length > 0) {
		const purchasedRedirect = purchased ? <Redirect to="/" /> : null
		summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
							ingredients={ingredients}
							checkoutCancelled={checkoutCancelledHandler}
							checkoutContinued={checkoutContinuedHandler}
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

const mapStateToProps = (state: RootStateType): Props => ({
	ingredients: state.burgerBuilder.ingredients,
	purchased: state.order.purchased
})

export default connect(mapStateToProps, null)(Checkout)
