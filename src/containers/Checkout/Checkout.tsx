import React from 'react'
import { Route, RouteProps, Redirect, useHistory } from 'react-router-dom'
import CheckoutSummary from 'components/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/rootTypes'

export interface HistoryProps {
	match: {
		path: RouteProps['path']
	},
}

const Checkout = (props: HistoryProps) => {
	const history = useHistory()

	const ingredients = useSelector((state: RootStateType) => state.burgerBuilder.ingredients)
	const purchased = useSelector((state: RootStateType) => state.order.purchased)

	const checkoutCancelledHandler = () => {
		history.goBack()
	}

	const checkoutContinuedHandler = () => {
		history.replace('/checkout/contact-data')
	}

	const { match } = props

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

export default Checkout
