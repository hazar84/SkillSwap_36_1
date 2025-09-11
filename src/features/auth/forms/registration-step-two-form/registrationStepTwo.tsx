import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../../../app/providers/store'
import {
    prevStep,
    updateStep2Data,
} from '../../model/registrationSlice'
import {
    fetchCategories,
    fetchSubcategories,
    selectCategoriesForFilter,
} from '../../../../entities/skills/model/skillsSlice'


import { AvatarSelect } from '../../../../shared/ui/AvatarSelect'
import InputUI from '../../../../shared/ui/Input'
import { Select } from '../../../../shared/ui/Select'
import DataInput from '../../../../shared/ui/DataInput'
import { Button } from '../../../../shared/ui/Button'


import styles from './registrationStepTwo.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'


interface RegistrationFormData {
    avatar?: string
    name: string
    birthDate?: Date | null
    gender: string
    city: string
    learnCategoryId: string
    learnSubcategoryId: string
}

const registrationSchema = yup.object({
    avatar: yup.string().optional().nullable().default(''),
    name: yup
        .string()
        .required('Обязательное поле')
        .min(2, 'ФИО должно содержать минимум 2 символа')
        .max(100, 'ФИО не должно превышать 100 символов')
        .matches(
            /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
            'ФИО может содержать только буквы и пробелы'
        ),
    birthDate: yup
        .date()
        .required('Обязательное поле')
        .typeError('Введите корректную дату')
        .max(new Date(), 'Дата рождения не может быть в будущем'),
    gender: yup.string().required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    learnCategoryId: yup.string().required('Обязательное поле'),
    learnSubcategoryId: yup.string().required('Обязательное поле'),
})

const cities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Красноярск',
    'Челябинск',
    'Самара',
    'Уфа',
    'Ростов-на-Дону',
    'Краснодар',
    'Омск',
    'Воронеж',
    'Пермь',
]


export const RegistrationStep2: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    const categories = useSelector(selectCategoriesForFilter)


    const [availableSubcategories, setAvailableSubcategories] = useState<
        string[]
    >([])
    const triggeredOnce = useRef(false)


    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
    } = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema as any),
        defaultValues: {
            avatar: '',
            name: '',
            birthDate: null,
            gender: '',
            city: '',
            learnCategoryId: '',
            learnSubcategoryId: '',
        },
        mode: 'onChange',
    })


    const handleFirstInteraction = () => {
        if (!triggeredOnce.current) {
            triggeredOnce.current = true
            trigger()
        }
    }


    const selectedCategory = watch('learnCategoryId')


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchSubcategories())
    }, [dispatch])



    useEffect(() => {
        if (selectedCategory) {
            const categorySubcategories =
                categories
                    .find((cat) => cat.id === selectedCategory)
                    ?.subcategories.map((sub) => sub.name) || []
            setAvailableSubcategories(categorySubcategories)


            setValue('learnSubcategoryId', '')
            trigger('learnSubcategoryId')
        } else {
            setAvailableSubcategories([])
        }
    }, [selectedCategory, categories, setValue, trigger])


    const handleFormSubmit = (data: RegistrationFormData) => {
        if (!data.birthDate) {
            return
        }


        const selectedSubcategory = categories
            .find((cat) => cat.id === data.learnCategoryId)
            ?.subcategories.find((sub) => sub.name === data.learnSubcategoryId)


        if (selectedSubcategory) {
            dispatch(
                updateStep2Data({
                    name: data.name,
                    birthDate: data.birthDate,
                    gender: data.gender as 'Мужской' | 'Женский',
                    city: data.city,
                    avatarUrl: data.avatar,
                    learnSubcategoryId: selectedSubcategory.id,
                })
            )


            // alert('✅ Форма шага 2 успешно валидирована и готова к отправке!\nДанные сохранены в store.\nПереход на шаг 3 был бы здесь.');


            // Переходим к следующему шагу
            navigate('/registration/step3')
        }
    }


    const handleBackClick = () => {
        dispatch(prevStep())
        navigate('/registration/step1')
    }


    return (
        <div className={styles.container}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                onFocus={handleFirstInteraction}
                className={styles.form}
            >
                {/* Аватар - центр */}
                <div className={styles.avatarSection}>
                    <Controller
                        name='avatar'
                        control={control}
                        render={({ field }) => (
                            <AvatarSelect
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <p className={styles.avatarHint}>Аватар (необязательно)</p>
                </div>


                {/* Имя  */}
                <div className={styles.nameRow}>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <InputUI
                                label='ФИО'
                                placeholder='Введите ваше полное имя'
                                type='text'
                                error={!!errors.name}
                                textError={errors.name?.message || ''}
                                helpText=''
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </div>


                {/* Дата рождения и пол - одна строка */}
                <div className={styles.dateGenderRow}>
                    <div>
                        <Controller
                            name='birthDate'
                            control={control}
                            render={({ field, fieldState }) => (
                                <DataInput
                                    label='Дата рождения'
                                    value={field.value || null}
                                    onChange={field.onChange}
                                    id='birthDate'
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>


                    <div>
                        <Controller
                            name='gender'
                            control={control}
                            render={({ field, fieldState }) => (
                                <Select
                                    label='Пол'
                                    placeholder='Выберите пол'
                                    error={fieldState.error?.message}
                                    value={field.value}
                                    valueList={['Мужской', 'Женский']}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>


                {/* Город */}
                <div className={styles.cityRow}>
                    <Controller
                        name='city'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label='Город'
                                placeholder='Выберите город'
                                error={fieldState.error?.message}
                                value={field.value}
                                valueList={cities}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>


                {/* Категория */}
                <div className={styles.categoryRow}>
                    <Controller
                        name='learnCategoryId'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label='Категория навыка'
                                placeholder='Выберите категорию'
                                error={fieldState.error?.message}
                                value={
                                    categories.find((cat) => cat.id === field.value)?.name || ''
                                }
                                valueList={categories.map((cat) => cat.name)}
                                onChange={(categoryName) => {
                                    const category = categories.find(
                                        (cat) => cat.name === categoryName
                                    )
                                    if (category) {
                                        field.onChange(category.id)
                                    }
                                }}
                            />
                        )}
                    />
                </div>


                {/* Подкатегория  */}
                <div className={styles.subcategoryRow}>
                    <Controller
                        name='learnSubcategoryId'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                label='Подкатегория навыка'
                                placeholder='Выберите подкатегорию'
                                error={fieldState.error?.message}
                                value={field.value}
                                valueList={availableSubcategories}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>


                {/* Кнопки */}
                <div className={styles.buttons}>
                    <Button variant='secondary' onClick={handleBackClick} className={styles.button}>
                        Назад
                    </Button>
                    <Button
                        variant='primary'
                        disabled={!isValid}
                        onClick={handleSubmit(handleFormSubmit)}
                        className={styles.button}
                    >
                        Продолжить
                    </Button>
                </div>
            </form>
        </div>
    )
}


export default RegistrationStep2
