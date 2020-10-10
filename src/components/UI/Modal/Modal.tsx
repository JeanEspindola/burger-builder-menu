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
		return nextProps.show !== this.props.show
	}
	render() {
		return (
				<Aux>
					<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
					<div
							className={classes.Modal}
							style={{
								transform: this.props.show ? 'translateY(0)':'translateY(-100vh)',
								opacity: this.props.show ? '1':'0'
							}}
					>
						{this.props.children}
					</div>
				</Aux>
		)
	}
}

export default Modal