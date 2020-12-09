import React, { useCallback, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { logout } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const Logout = () => {
	const dispatch = useDispatch()
	const onLogout = useCallback(() => dispatch(logout()), [dispatch])

	useEffect(() => {
		onLogout()
	}, [onLogout])

	return <Redirect to="/" />
}

export default Logout
