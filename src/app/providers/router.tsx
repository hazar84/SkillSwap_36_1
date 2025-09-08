import {
	createBrowserRouter,
	Outlet,
	useLocation,
} from 'react-router-dom'

// для фона модалок + еще надо прописывать state={{ background: location }} в ссылке на модалку
const RootLayout  = () => {
	const location = useLocation()
	const background = location.state && location.state.background

	return (
		<>
			<Outlet context={{ background }} />
		</>
	)
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout  />,
		children: [
			{ index: true,  /* element: <CatalogPage /> */ },
			{ path: 'skill:id', /* element: <SkillPage /> */ },
            { path: '*',   /* element: <NotFound404 /> */ },
			{
				path: 'profile',
				// element: (
				// 	<PrivateRoute>
				// 		<Profile />
				// 	</PrivateRoute>
				// ),
			},
			{
				path: 'login',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<Login />
				// 	</PrivateRoute>
				// ),
			},
			{
                /* регистрация (три шага) */
				path: 'register',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<Registration />
				// 	</PrivateRoute>
				// ),
			},
			// Модальные роуты
			{
                /*  Модалка Ваше предложение */
				path: 'register/offer',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<Modal>
				// 			<Offer />
				// 		</Modal>
				// 	</PrivateRoute>
				// ),
			},
			{
                /*  Модалка вы успешно создали предложение - конец регистрации */
				path: 'register/success',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<Modal>
				// 			<SuccessOffer />
				// 		</Modal>
				// 	</PrivateRoute>
				// ),
			},
			{
                /*  Модалка вы успешно предложили обмен, мб нужен id */
				path: 'offer/success',
				// element: (
				// 	<PrivateRoute>
				// 		<Modal>
				// 			<SuccessExchange />
				// 		</Modal>
				// 	</PrivateRoute>
				// ),
			},
		],
	},
])

