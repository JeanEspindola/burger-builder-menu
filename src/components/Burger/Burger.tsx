import React from 'react'
import classes from './Burger.module.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

// @ts-ignore
const Burger = (props) => {
	let transfIngredients = Object.keys(props.ingredients)
			.map(itemKey => {
				return [...Array(props.ingredients[itemKey])].map((_, i) => {
					return <BurgerIngredient key={itemKey + i} type={itemKey} />
				})
			})
			.reduce((arr, el) => {
				return arr.concat(el)
			}, [])

	if (transfIngredients.length === 0) {
		// @ts-ignore
		transfIngredients = <p>Please start adding ingredients!</p>
	}

	return (
			<div className={classes.Burger}>
				<BurgerIngredient type="bread-top" />
				{transfIngredients}
				<BurgerIngredient type="bread-bottom" />
			</div>
	)
}

export default Burger