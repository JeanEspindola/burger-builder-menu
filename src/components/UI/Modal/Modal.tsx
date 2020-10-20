import React from 'react'
import classes from './Modal.module.scss'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

export interface ModalProps {
	show: boolean
	modalClosed: () => void
	children: React.ReactNode
}

class Modal extends React.Component<ModalProps> {
	shouldComponentUpdate(nextProps: ModalProps, nextState: any) {
		return nextProps.show !== this.props.show ||
				nextProps.children !== this.props.children
	}
	render() {
		const { show, children, modalClosed } = this.props
		return (
				<Aux>
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
				</Aux>
		)
	}
}

export default Modal
