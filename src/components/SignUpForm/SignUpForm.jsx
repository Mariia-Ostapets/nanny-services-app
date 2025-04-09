import { useId, useState } from 'react';
import Button from '../ui/Button/Button';
import css from './SignUpForm.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(10, 'Maximum 10 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function SignUpForm({ closeModal }) {
  const [isEyeOff, setIsEyeOff] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const pwdId = useId();

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      await dispatch(signUp(data)).unwrap();
      // toast.success('User successfully registered!');
      closeModal();
    } catch (error) {
      console.error('SIGN UP ERROR:', error);
    }
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  return (
    <form className={css.signUpForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.signUpFormTitle}>Registration</h2>
      <p className={css.signUpFormText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <input
        className={css.signUpFormName}
        type="text"
        placeholder="Name"
        {...register('name')}
      />
      {errors.name && (
        <p className={css.errorMessageName}>{errors.name.message}</p>
      )}
      <input
        className={css.signUpFormEmail}
        type="text"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email && (
        <p className={css.errorMessageEmail}>{errors.email.message}</p>
      )}
      <label htmlFor={pwdId}>
        <input
          className={css.signUpFormPwd}
          id={pwdId}
          type={isEyeOff ? 'password' : 'text'}
          placeholder="Password"
          {...register('password')}
        />
        <svg
          className={css.signUpFormIcon}
          width={20}
          height={20}
          onClick={togglePasswordVisibility}
        >
          <use href={`/sprite.svg#icon-${isEyeOff ? 'eye-off' : 'eye'}`} />
        </svg>
      </label>
      {errors.password && (
        <p className={css.errorMessagePwd}>{errors.password.message}</p>
      )}
      <Button type="submit" variant="signUpLogInModalSend">
        Sign Up
      </Button>
    </form>
  );
}
