import React from 'react'
import classes from './Backdrop.module.scss'

export interface BackdropProps {
	show: boolean
	clicked: () => void
}

const Backdrop = (props: BackdropProps) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null
)

export default Backdrop
