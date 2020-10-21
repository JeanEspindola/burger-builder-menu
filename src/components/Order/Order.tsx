import React from 'react'
import classes from './Order.module.scss'
import { IngredientsType } from '../../utils/types'

interface OrderProps {
	price: string
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
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	)
}

export default Order
