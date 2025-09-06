import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputUI from '../../../../shared/ui/Input'
import { Button } from '../../../../shared/ui/Button'
import * as yup from 'yup';
import styles from './LoginForm.module.css'

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Введите корректный email')
    .required('Email обязателен для заполнения'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен для заполнения'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const LoginForm = ({ onSubmit, isSubmitting: externalIsSubmitting = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Login error:', error);
      // Ошибка обрабатывается в родительском компоненте или здесь можно добавить дополнительную логику
    }
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const isFormInvalid = !isValid || !emailValue || !passwordValue;
  const isActuallySubmitting = externalIsSubmitting;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className="form-group">
        <InputUI
          label="Email"
          placeholder="Введите ваш email"
          type="email"
          error={!!errors.email}
          textError={errors.email?.message || ''}
          helpText="Введите ваш email адрес"
          value={emailValue || ''}
          callback={(value) => setValue('email', value)}
          {...register('email')}
        />
      </div>

      <div className="form-group">
        <InputUI
          label="Пароль"
          placeholder="Введите ваш пароль"
          type="password"
          error={!!errors.password}
          textError={errors.password?.message || ''}
          helpText="Минимум 6 символов"
          value={passwordValue || ''}
          callback={(value) => setValue('password', value)}
          {...register('password')}
        />
      </div>

      <Button
        variant="primary"
        disabled={isActuallySubmitting || isFormInvalid}
        className={styles.button}
      >
        {isActuallySubmitting ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};

export default LoginForm;