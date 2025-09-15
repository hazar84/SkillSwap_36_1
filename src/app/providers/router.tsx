import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import PrivateRoute from '../../features/auth/privateRoute/privateRoute'
import { LoginPage } from '../../pages/login/login'
import { RegistrationStepOnePage } from '../../pages/registration-step-one/registration-step-one'
import { NotFound404 } from '../../pages/notFound404/NotFound404'
import SkillPage from '../../pages/skill/skill'
import { MainPage } from '../../pages/main/main'

// для фона модалок + еще надо прописывать state={{ background: location }} в ссылке на модалку
const RootLayout = () => {
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
		element: <RootLayout />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: 'skill/:id', element: <SkillPage /> },
			{ path: '*', element: <NotFound404 /> },
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
				element: (
					<PrivateRoute anonymous>
						<LoginPage />
					</PrivateRoute>
				),
			},
			{
				/* регистрация (первый шаг) */
				path: 'registration/step1',
				element: (
					<PrivateRoute anonymous>
						<RegistrationStepOnePage />
					</PrivateRoute>
				),
			},
			{
				/* регистрация (три шага) */
				path: 'registration/step2',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<RegistrationStepTwoPage />
				// 	</PrivateRoute>
				// ),
			},
			{
				/* регистрация (три шага) */
				path: 'registration/step3',
				// element: (
				// 	<PrivateRoute anonymous>
				// 		<RegistrationStepThreePage />
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
