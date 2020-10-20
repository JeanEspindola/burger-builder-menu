import React from 'react'
import classes from './CheckoutSummary.module.scss'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import { ButtonsEnum } from '../../utils/constants'
import { FormattedMessage } from 'react-intl'
import { IngredientsType } from '../../utils/types'

interface CheckoutSummaryProps {
	ingredients: IngredientsType
	checkoutCancelled: () => void
	checkoutContinued: () => void
}

const CheckoutSummary = (props: CheckoutSummaryProps) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>
				<FormattedMessage id="checkoutSummary.title" />
			</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button clicked={props.checkoutCancelled} btnType={ButtonsEnum.danger}>
				<FormattedMessage id="button.cancel" />
			</Button>
			<Button clicked={props.checkoutContinued} btnType={ButtonsEnum.success}>
				<FormattedMessage id="button.continue" />
			</Button>
		</div>
	)
}

export default CheckoutSummary
