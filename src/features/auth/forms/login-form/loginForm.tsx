import { useForm, Controller } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
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
    }
  };

  const isActuallySubmitting = isSubmitting || externalIsSubmitting;
  const isFormInvalid = !isValid;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className="form-group">
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputUI
              label="Email"
              placeholder="Введите email"
              type="email"
              error={!!errors.email}
              textError={errors.email?.message || ''}
              helpText="Введите ваш email адрес"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="form-group">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputUI
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
              error={!!errors.password}
              textError={errors.password?.message || ''}
              helpText="Минимум 6 символов"
              value={field.value}
              onChange={field.onChange}
            />
          )}
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