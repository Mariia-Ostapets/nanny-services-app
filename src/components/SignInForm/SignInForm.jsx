import { useId, useState } from 'react';
import Button from '../ui/Button/Button';
import css from './SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/auth/operations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function SignInForm({ closeModal }) {
  const [isEyeOff, setIsEyeOff] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const pwdId = useId();

  const dispatch = useDispatch();

  // const onSubmit = data => {
  //   console.log('Dispatching signIn with:', data);
  //   dispatch(signIn(data));
  //   closeModal();
  // };

  const onSubmit = async data => {
    console.log('Dispatching signIn with:', data);
    try {
      await dispatch(signIn(data)).unwrap();
      toast.success('User successfully logged in!');
      closeModal();
    } catch (error) {
      console.error('SIGN IN ERROR:', error);
    }
  };

  const togglePasswordVisibility = () => setIsEyeOff(prev => !prev);

  return (
    <form className={css.signInForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.signInFormTitle}>Log In</h2>
      <p className={css.signInFormText}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <input
        className={css.signInFormEmail}
        type="text"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email && (
        <p className={css.errorMessageEmail}>{errors.email.message}</p>
      )}
      <label htmlFor={pwdId}>
        <input
          className={css.signInFormPwd}
          id={pwdId}
          type={isEyeOff ? 'password' : 'text'}
          placeholder="Password"
          {...register('password')}
        />
        <svg
          className={css.signInFormIcon}
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
        {isSubmitting ? 'Loading...' : 'Log In'}
      </Button>
    </form>
  );
}
