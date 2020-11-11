import React from 'react'
import Order from 'components/Order/Order'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { Dispatch } from 'redux'
import { fetchOrders } from '../../redux/actions/orderActions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { RootStateTypes } from '../../redux/rootTypes'

// TODO: type orders from database
interface Props {
	orders: []
	loading: boolean
	token: string
}

interface DispatchProps {
	onFetchOrders: (token: string) => void
}

interface OrdersPropsType extends Props, DispatchProps {}

class Orders extends React.Component<OrdersPropsType> {
	componentDidMount() {
		const { onFetchOrders, token } = this.props
		onFetchOrders(token)
	}

	render() {
		let orders = <Spinner />

		if (!this.props.loading) {
			// @ts-ignore
			orders = this.props.orders.map((order: any) => (
						<Order
								key={order.id}
								ingredients={order.ingredients}
								price={order.price}
						/>
				))
		}

		return(
				<div>
					{orders}
				</div>
		)
	}
}

const mapStateToProps = (state: RootStateTypes): Props => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onFetchOrders: (token: string) => dispatch(fetchOrders(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
