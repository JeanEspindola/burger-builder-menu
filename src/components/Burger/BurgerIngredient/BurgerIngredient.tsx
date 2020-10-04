import React from 'react'
import classes from './BurgerIngredient.module.scss'
import { IngredientsType } from '../../../utils/constants'

export interface BurgerIngredientProps {
	type: string,
}

const BurgerIngredient = (props: BurgerIngredientProps) => {
	let ingredient = null

	switch (props.type) {
		case (IngredientsType.breadBottom):
			ingredient = <div className={classes.BreadBottom}/>
			break
		case (IngredientsType.breadTop):
			ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1}/>
						<div className={classes.Seeds2}/>
					</div>
			)
			break
		case (IngredientsType.meat):
			ingredient = <div className={classes.Meat}/>
			break
		case (IngredientsType.cheese):
			ingredient = <div className={classes.Cheese}/>
			break
		case (IngredientsType.salad):
			ingredient = <div className={classes.Salad}/>
			break;
		case (IngredientsType.bacon):
			ingredient = <div className={classes.Bacon}/>
			break
		default:
			ingredient = null
	}

	return ingredient
}

export default BurgerIngredient