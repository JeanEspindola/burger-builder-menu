import React from 'react'
import classes from './CheckoutSummary.module.scss'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'
import { ButtonsEnum } from '../../utils/constants'
import { FormattedMessage } from 'react-intl'

// @ts-ignore
const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well!!</h1>
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
