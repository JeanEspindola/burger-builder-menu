import React from 'react'
import classes from './Modal.module.scss'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

export interface ModalProps {
	show: boolean
	modalClosed: () => void
	children: React.ReactNode
}

const Modal = (props: ModalProps) => (
		<Aux>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
					className={classes.Modal}
					style={{
						transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: props.show ? '1' : '0'
					}}
			>
				{props.children}
			</div>
		</Aux>
)

export default Modal