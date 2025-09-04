import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from '../../../app/providers/store'
import { selectIsAuthenticated } from '../model/userSlice'
import type { FC, ReactNode } from 'react'

type PrivateRouteProps = {
	children: ReactNode
	anonymous?: boolean
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, anonymous = false }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const location = useLocation()
	const from = location.state?.from || '/'

	if (anonymous && isAuthenticated) {
		return <Navigate to={from} />
	}

	if (!anonymous && !isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} />
	}

	return children
}

export default PrivateRoute
