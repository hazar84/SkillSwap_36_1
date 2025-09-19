import { Outlet, useLocation } from 'react-router-dom'

const RootLayout = () => {
	const location = useLocation()
	const background = location.state && location.state.background

	return (
		<>
			<Outlet context={{ background }} />
		</>
	)
}

export default RootLayout
