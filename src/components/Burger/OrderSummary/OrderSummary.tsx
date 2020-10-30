import React from 'react'
import Button from '../../UI/Button/Button'
import { ButtonsEnum } from 'utils/constants'
import { IngredientsType } from 'utils/types'
import { FormattedMessage } from 'react-intl'

// TODO: reuse interfaces
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
				<React.Fragment>
					<h3>
						<FormattedMessage id="orderSummary.title" />
					</h3>
					<p>
						<FormattedMessage id="orderSummary.description" />
					</p>
					<ul>
						{ingredientSummary}
					</ul>
					<p>
						<strong>
						<FormattedMessage id="orderSummary.price" />
							{` `}${props.price.toFixed(2)}
						</strong>
					</p>
					<p>
						<FormattedMessage id="orderSummary.continueCheckout" />
					</p>
					<Button btnType={ButtonsEnum.danger} clicked={props.purchaseCanceled}>
						<FormattedMessage id="button.cancel" />
					</Button>
					<Button btnType={ButtonsEnum.success} clicked={props.purchaseContinued}>
						<FormattedMessage id="button.continue" />
					</Button>
				</React.Fragment>
		)
}

export default OrderSummary
