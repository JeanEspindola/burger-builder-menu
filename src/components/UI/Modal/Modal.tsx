import React from 'react'
import classes from './Modal.module.scss'
import Backdrop from '../Backdrop/Backdrop'

export interface ModalProps {
	show: boolean
	modalClosed: () => void
	children: React.ReactNode
}

const Modal = (props: ModalProps) => {
	const { show, children, modalClosed } = props
	return (
			<React.Fragment>
				<Backdrop show={show} clicked={modalClosed}/>
				<div
						className={classes.Modal}
						style={{
							transform: show ? 'translateY(0)':'translateY(-100vh)',
							opacity: show ? '1':'0'
						}}
				>
					{children}
				</div>
			</React.Fragment>
	)
}

export default React.memo(
		Modal,
		(prevProps, nextProps) =>
				nextProps.show === prevProps.show &&
				nextProps.children === prevProps.children
)
