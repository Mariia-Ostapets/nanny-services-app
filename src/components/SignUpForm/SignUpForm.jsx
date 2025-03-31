import Button from '../ui/Button/Button';
import css from './SignUpForm.module.css';
import { useForm } from 'react-hook-form';

export default function SignUpForm({ type, variant }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className={css.signUpForm}
      onSubmit={handleSubmit(data => console.log(data))}
    >
      <h2 className={css.signUpFormTitle}>Registration</h2>
      <p className={css.signUpFormText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <input type="text" placeholder="Name" {...register('firstName')} />
      <input
        type="text"
        placeholder="Email"
        {...register('lastName', { required: true })}
      />
      {errors.lastName && <p>Last name is required.</p>}
      <input
        type="password"
        placeholder="Password"
        {...register('age', { pattern: /\d+/ })}
      />
      {errors.age && <p>Please enter number for age.</p>}
      <Button type="submit" variant="signUpLogInModalSend">
        Sign Up
      </Button>
    </form>
  );
}
