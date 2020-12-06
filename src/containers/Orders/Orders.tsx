import React, { useEffect } from 'react'
import Order from 'components/Order/Order'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { Dispatch } from 'redux'
import { fetchOrders } from '../../redux/actions/orderActions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { RootStateType } from '../../redux/rootTypes'
import { OrderType } from './ordersType'

interface Props {
	orders: OrderType[]
	loading: boolean
	token: string
	userId: string
}

interface DispatchProps {
	onFetchOrders: (token: string, userId: string) => void
}

interface OrdersPropsType extends Props, DispatchProps {}

const Orders = (props: OrdersPropsType) => {
	const { onFetchOrders, token, userId } = props

	useEffect(() => {
		onFetchOrders(token, userId)
	}, [onFetchOrders, token, userId])

	let orders: React.ReactNode = <Spinner />

	if (!props.loading) {
		orders = props.orders.map((order: OrderType) => (
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

const mapStateToProps = (state: RootStateType): Props => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	// @ts-ignore
	onFetchOrders: (token: string, userId: string) => dispatch(fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
