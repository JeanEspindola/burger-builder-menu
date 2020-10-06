import React from 'react'
import classes from './BurgerIngredient.module.scss'
import { IngredientsEnum } from '../../../utils/constants'

export interface BurgerIngredientProps {
	type: string,
}

const BurgerIngredient = (props: BurgerIngredientProps) => {
	let ingredient = null

	switch (props.type) {
		case (IngredientsEnum.breadBottom):
			ingredient = <div className={classes.BreadBottom}/>
			break
		case (IngredientsEnum.breadTop):
			ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1}/>
						<div className={classes.Seeds2}/>
					</div>
			)
			break
		case (IngredientsEnum.meat):
			ingredient = <div className={classes.Meat}/>
			break
		case (IngredientsEnum.cheese):
			ingredient = <div className={classes.Cheese}/>
			break
		case (IngredientsEnum.salad):
			ingredient = <div className={classes.Salad}/>
			break;
		case (IngredientsEnum.bacon):
			ingredient = <div className={classes.Bacon}/>
			break
		default:
			ingredient = null
	}

	return ingredient
}

export default BurgerIngredient