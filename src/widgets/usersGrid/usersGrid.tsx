import styles from './usersGrid.module.css'
import { CardList } from '../../entities/cards/components/cardList/cardList'
import { useDispatch, useSelector } from '../../app/providers/store'
import { useEffect, useMemo, type FC } from 'react'
import {
	selectMode,
	selectSkillIds,
	selectGender,
	selectCity,
	selectSearchQuery,
	filtersActions,
} from '../../features/filters/model/filtersSlice'
import {
	selectCards,
	selectCardsLoading,
	selectCardsError,
} from '../../entities/cards/model/cardsSlice'
import { useLocation } from 'react-router-dom'
import { selectSubcategories } from '../../entities/skills/model/skillsSlice'

export const UsersGrid: FC = () => {
	const dispatch = useDispatch()

	// данные строки поиска
	const location = useLocation()
	const searchQuery = useSelector(selectSearchQuery) // поисковый запрос из Redux

	// фильтры
	const filterMode = useSelector(selectMode)
	const filterSkillId = useSelector(selectSkillIds)
	const filterGender = useSelector(selectGender)
	const filterCity = useSelector(selectCity)

	const cardsData = useSelector(selectCards) // карточки
	const cardsLoading = useSelector(selectCardsLoading) //загрузка
	const cardsError = useSelector(selectCardsError) //ошибка
	const allSubcategories = useSelector(selectSubcategories) // подкатегории

	// Хук для синхронизации состояния Redux с URL при первой загрузке.
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search)
		const queryFromURL = searchParams.get('search') || ''
		dispatch(filtersActions.setSearchQuery(queryFromURL))
	}, [dispatch])

	// map из ID подкатегории в название
	const subcategoriesMap = useMemo(
		() => new Map(allSubcategories.map((sub) => [sub.id, sub.name])),
		[allSubcategories]
	)

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
				const query = searchQuery.toLowerCase()
				// Поиск в skillCanTeach.name
				const matchesSkillCanTeach = card.skillCanTeach.name
					.toLowerCase()
					.includes(query)
				// Поиск в subcategoriesWantToLearn
				const matchesWantToLearn = card.subcategoriesWantToLearn.some(
					(subId) => {
						const subName = subcategoriesMap.get(subId)
						return subName && subName.toLowerCase().includes(query)
					}
				)
				// Если не найдено ни в skillCanTeach, ни в subcategoriesWantToLearn - пропускаем
				if (!matchesSkillCanTeach && !matchesWantToLearn) {
					return false
				}
			}

			// Фильтрация по полу
			if (filterGender && card.gender !== filterGender) return false

			// Фильтрация по городу
			if (filterCity && card.city?.toLowerCase() !== filterCity.toLowerCase())
				return false

			// Фильтрация по ID навыков
			if (filterSkillId.length > 0) {
				const canTeachMatches = filterSkillId.includes(
					card.skillCanTeach.subcategoryId
				)
				const wantToLearnMatches = card.subcategoriesWantToLearn.some((subId) =>
					filterSkillId.includes(subId)
				)
				// Если режим "Может научить", а совпадения нет - убираем карточку.
				if (filterMode === 'canTeach' && !canTeachMatches) return false
				// Если режим "Хочет научиться", а совпадения нет - убираем карточку.
				if (filterMode === 'wantToLearn' && !wantToLearnMatches) return false
				// Если режим "Все", а совпадений нет ни там, ни там - убираем карточку.
				if (filterMode === 'all' && !canTeachMatches && !wantToLearnMatches)
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
		searchQuery,
		subcategoriesMap,
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
