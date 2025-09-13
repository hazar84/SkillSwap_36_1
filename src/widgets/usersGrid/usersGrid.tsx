import styles from './usersGrid.module.css'
import { CardList } from '../../entities/cards/components/cardList/cardList'
import { useSelector } from '../../app/providers/store'
import { useMemo, type FC } from 'react'
import {
	selectMode,
	selectSkillIds,
	selectGender,
	selectCity,
} from '../../features/filters/model/filtersSlice'
import {
	selectCards,
	selectCardsLoading,
	selectCardsError,
} from '../../entities/cards/model/cardsSlice'
import { useLocation } from 'react-router-dom'

export const UsersGrid: FC = () => {
	// const dispatch = useDispatch()

	// данные строки поиска
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const searchQuery = searchParams.get('search') || ''

	// фильтры
	const filterMode = useSelector(selectMode)
	const filterSkillId = useSelector(selectSkillIds)
	const filterGender = useSelector(selectGender)
	const filterCity = useSelector(selectCity)

	const cardsData = useSelector(selectCards) // карточки
	const cardsLoading = useSelector(selectCardsLoading) //загрузка
	const cardsError = useSelector(selectCardsError) //ошибка

	// Активные фильтры
	const activeFilters = useMemo(() => {
		return (
			filterMode !== 'all' ||
			filterSkillId.length > 0 ||
			filterGender !== null ||
			filterCity !== null ||
			searchQuery !== ''
		)
	}, [filterMode, filterSkillId, filterGender, filterCity, searchQuery])

	// Отфильтрованные карточки
	const filteredCards = useMemo(() => {
		if (!activeFilters) return cardsData
		return cardsData.filter((card) => {
			// фильтрация по навыкам из поисковой строки
			if (searchQuery) {
				// Поиск в skillCanTeach.name
				const matchesSkillCanTeach = card.skillCanTeach.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase())

				// Поиск в skillExchanges (массив строк)
				const matchesSkillExchanges =
					card.skillExchanges?.some((skillName) =>
						skillName.toLowerCase().includes(searchQuery.toLowerCase())
					) || false

				// Если не найдено ни в skillCanTeach, ни в skillExchanges - пропускаем
				if (!matchesSkillCanTeach && !matchesSkillExchanges) {
					return false
				}
			}

			// Фильтрация по полу
			if (filterGender && card.gender !== filterGender) return false

			// Фильтрация по городу
			if (filterCity && card.city?.toLowerCase() !== filterCity.toLowerCase())
				return false

			// Фильтрация по ID навыков
			if (
				filterSkillId.length > 0 &&
				!filterSkillId.includes(card.skillCanTeach.id)
			) {
				return false
			}

			// Фильтрация по mode
			if (filterMode === 'canTeach') {
				// Уже есть skillCanTeach по умолчанию
				return true
			} else if (filterMode === 'wantToLearn') {
				return (
					card.subcategoriesWantToLearn &&
					card.subcategoriesWantToLearn.length > 0
				)
			}

			return true
		})
	}, [
		activeFilters,
		cardsData,
		filterMode,
		filterSkillId,
		filterGender,
		filterCity,
		searchQuery,
	])

	// Популярные
	const popularCards = useMemo(() => {
		return cardsData
			.filter((card) => card.favorites && card.favorites.length > 0)
			.sort((a, b) => b.favorites.length - a.favorites.length)
			.slice(0, 3)
	}, [cardsData])

	// Новые
	const newCards = useMemo(() => {
		return cardsData
			.filter((card) => {
				const oneMonthAgo = new Date()
				oneMonthAgo.setDate(oneMonthAgo.getDate() - 90)

				return new Date(card.createdProfile) >= oneMonthAgo
			})
			.sort(
				(a, b) =>
					new Date(b.createdProfile).getTime() -
					new Date(a.createdProfile).getTime()
			)
			.slice(0, 3)
	}, [cardsData])

	// Рекомендуемые
	const recommendedCards = useMemo(() => {
		return cardsData.filter((card) => {
			// Проверяем что карточка не входит в другие категории
			const isUsed =
				newCards.some((c) => c.id === card.id) ||
				popularCards.some((c) => c.id === card.id)
			return !isUsed
		})
	}, [cardsData, newCards, popularCards])

	//Момент загрузки
	if (cardsLoading) {
		return <div>Загрузка...</div>
	}

	// Если ошибка
	if (cardsError) {
		return <div>Ошибка: {cardsError}</div>
	}

	// Если ничего не нашлось
	if (filteredCards.length === 0) {
		return <div>Ничего не найдено</div>
	}

	// const onToggleFavorite = (id: string) => {
	//   dispatch()
	// }

	return (
		<section className={styles.container}>
			{activeFilters ? (
				// Если есть фильтры - показываем одну секцию с результатами
				<CardList
					title={`Подходящие предложения: ${filteredCards.length}`}
					data={filteredCards}
					small={false}
					navigateButton={''} //ссылка на страницу
				/>
			) : (
				// Если нет фильтров - показываем три секции
				<>
					<CardList
						title={'Популярное'}
						data={popularCards}
						small={true}
						navigateButton={''}
						// onToggleFavorite={onToggleFavorite}
					/>

					<CardList
						title={'Новое'}
						data={newCards}
						small={true}
						navigateButton={''}
					/>

					<CardList
						title={'Рекомендуем'}
						data={recommendedCards}
						small={false}
						navigateButton={''}
					/>
				</>
			)}
		</section>
	)
}
