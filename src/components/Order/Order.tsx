import React from 'react'
import classes from './Order.module.scss'
import { IngredientsType } from 'utils/types'
import { FormattedMessage } from 'react-intl'

interface OrderProps {
	price: number
	ingredients: IngredientsType
}

const Order = (props: OrderProps) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		})
	}

	const ingredientOutput = ingredients.map(ig => {
		return (
			<span key={ig.name} className={classes.Ingredient}>
				{ig.name} ({ig.amount})
			</span>
		)
	})

	return (
    <div className={classes.Order}>
			<p>
				<FormattedMessage id="order.ingredients" />
				{` `}{ingredientOutput}
			</p>
			<p>
				<FormattedMessage id="order.price" />
				<strong>
					{` $ ${Number.parseFloat(String(props.price)).toFixed(2)}`}
				</strong>
			</p>
		</div>
	)
}

export default Order
