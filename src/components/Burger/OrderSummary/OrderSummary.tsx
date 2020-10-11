import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'
import { ButtonsEnum } from '../../../utils/constants'
import { IngredientsType } from '../../../containers/BurgerBuilder/BurgerBuilder'

export interface OrderSummaryProps {
	ingredients: IngredientsType
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
					<Button btnType={ButtonsEnum.danger} clicked={props.purchaseCanceled}>CANCEL</Button>
					<Button btnType={ButtonsEnum.success} clicked={props.purchaseContinued}>CONTINUE</Button>
				</Aux>
		)
}

export default OrderSummary