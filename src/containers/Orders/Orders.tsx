import React, { useCallback, useEffect } from 'react'
import Order from 'components/Order/Order'
import axios from 'axios-orders'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../redux/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { RootStateType } from '../../redux/rootTypes'
import { OrderType } from './ordersType'

const Orders = () => {
	const { orders, loading } = useSelector((state: RootStateType) => state.order)
	const { token, userId } = useSelector((state: RootStateType) => state.auth)

	const dispatch = useDispatch()

	const onFetchOrders = useCallback((token: string, userId: string) => dispatch(fetchOrders(token, userId)), [dispatch])

	useEffect(() => {
		onFetchOrders(token, userId)
	}, [onFetchOrders, token, userId])

	let ordersElem: React.ReactNode = <Spinner />

	if (!loading) {
		ordersElem = orders.map((order: OrderType) => (
					<Order
							key={order.id}
							ingredients={order.ingredients}
							price={order.price}
					/>
			))
	}

	return(
			<div>
				{ordersElem}
			</div>
	)
}

export default withErrorHandler(Orders, axios)
