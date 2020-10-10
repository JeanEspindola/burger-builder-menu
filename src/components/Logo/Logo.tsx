import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.scss'

const Logo = () => (
    <div className={classes.Logo}>
			<img src={BurgerLogo} alt="MyBurger" />
		</div>
)

export default Logo