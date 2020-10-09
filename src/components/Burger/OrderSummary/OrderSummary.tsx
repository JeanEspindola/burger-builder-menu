import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

// TODO: type ingredients
export interface OrderSummaryProps {
	ingredients: any
	price: number
	purchaseCanceled: () => void
	purchaseContinued: () => void
}


const OrderSummary = (props: OrderSummaryProps) => {
	const ingredientSummary = Object.keys(props.ingredients)
			.map(igKey => {
				return (
						<li key={igKey}>
							<span style={{ textTransform: 'capitalize' }}>{igKey}:</span>
							{/* @ts-ignore */}
							{props.ingredients[igKey]}
						</li>
				)
			})

	return (
				<Aux>
					<h3>Your Order</h3>
					<p>A delicious Burger with the following ingredients:</p>
					<ul>
						{ingredientSummary}
					</ul>
					<p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
					<p>Continue to Checkout?</p>
					<Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
					<Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
				</Aux>
		)
}

export default OrderSummary