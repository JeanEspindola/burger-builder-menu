import React from 'react'
import classes from './Spinner.module.scss'
import { FormattedMessage } from 'react-intl'

const Spinner = () => (
		<div className={classes.Loader}>
			<FormattedMessage id="loading" />
		</div>
)

export default Spinner