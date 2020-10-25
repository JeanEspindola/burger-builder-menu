import React from 'react'
import classes from './Burger.module.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { IngredientsEnum } from '../../utils/constants'
import { IngredientsType } from '../../utils/types'
import { FormattedMessage } from 'react-intl'

interface BurgerProps {
	ingredients: IngredientsType
}

const Burger = (props: BurgerProps) => {
	let transfIngredients: JSX.Element[] = Object.keys(props.ingredients)
			.map(itemKey => {
				return [...Array(props.ingredients[itemKey])].map((_, i) => {
					return <BurgerIngredient key={itemKey + i} type={itemKey} />
				})
			})
			.reduce((arr, el) => {
				return arr.concat(el)
			}, [])

	const emptyBurgerParagraph: JSX.Element = <p key="emptyP"><FormattedMessage id="burger.noIngredients" /></p>

	if (transfIngredients.length === 0) {
		transfIngredients.push(emptyBurgerParagraph)
	}

	return (
			<div className={classes.Burger}>
				<BurgerIngredient type={IngredientsEnum.breadTop} />
				{transfIngredients}
				<BurgerIngredient type={IngredientsEnum.breadBottom} />
			</div>
	)
}

export default Burger
