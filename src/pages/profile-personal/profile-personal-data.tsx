import React, { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import ProfileSidebar from '../../features/profile-sidebar/ProfileSidebar'
import { useSelector, useDispatch } from '../../app/providers/store'
import { selectUser } from '../../features/auth/model/userSlice'
import { editLocalUser } from '../../features/auth/model/thunks'
import styles from './profile-personal-data.module.css'
import type { TUser } from '../../shared/lib/types'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import InputUI from '../../shared/ui/Input'
import { Select } from '../../shared/ui/Select'
import DataInput from '../../shared/ui/DataInput'
import { Button } from '../../shared/ui/Button'
import { AvatarSelect } from '../../shared/ui/AvatarSelect'


const ProfilePersonalData: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const [formData, setFormData] = useState<TUser | null>(null)

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (formData) {
      dispatch(editLocalUser(formData))
    }
  }

  if (!formData) {
    return null
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <ProfileSidebar activeItem="personal-data" />
        </div>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <InputUI
              label="Почта"
              type="email"
              placeholder=""
              value={formData.email}
              onChange={((value: string) => setFormData({ ...formData, email: value })) as any}
              error={false}
              textError=""
            />
            <span onClick={() => {}} className={styles.passwordLink}>
              Изменить пароль
            </span>
            </div>
            <div className={styles.field}>
            <InputUI
              label="Имя"
              type="text"
              placeholder=""
              value={formData.name}
              onChange={((value: string) => setFormData({ ...formData, name: value })) as any}
              error={false}
              textError=""
            />
            </div>
            <div className={styles.row}>
              <DataInput
                label="Дата рождения"
                id="birthDate"
                value={formData.birthDate ? new Date(formData.birthDate) : null}
                onChange={(date) => date && setFormData({ ...formData, birthDate: date.toISOString() })}
              />
              <Select
                label="Пол"
                placeholder=""
                value={formData.gender as 'Мужской' | 'Женский'}
                valueList={["Мужской", "Женский"]}
                onChange={(value: string) => setFormData({ ...formData, gender: value as 'Мужской' | 'Женский' })}
              />
            </div>
            <Select
              label="Город"
              placeholder=""
              value={formData.city}
              valueList={["Москва", "Санкт-Петербург", "Казань"]}
              onChange={(value: string) => setFormData({ ...formData, city: value })}
            />
            <InputUI
              label="О себе"
              type="text"
              placeholder=""
              value={formData.aboutUser || ''}
              onChange={((value: string) => setFormData({ ...formData, aboutUser: value })) as any}
              error={false}
              textError=""
              height={80}
            />
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </form>
          <AvatarSelect
            size="large"
            value={formData.avatarUrl || ''}
            onChange={(value: string) => setFormData({ ...formData, avatarUrl: value })}
          />
        </div>
      </div>
      <FooterUI />
    </>
  )
}

export default ProfilePersonalData
