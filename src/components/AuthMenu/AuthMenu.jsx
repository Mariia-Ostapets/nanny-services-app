import css from './AuthMenu.module.css';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import Button from '../ui/Button/Button';

export default function AuthMenu({ openModal }) {
  return (
    <div className={css.authMenuWrapper}>
      <Button
        type="button"
        variant="logIn"
        onClick={() => openModal(<SignInForm />)}
      >
        Log In
      </Button>
      <Button
        type="button"
        variant="registration"
        onClick={() => openModal(<SignUpForm />)}
      >
        Registration
      </Button>
    </div>
  );
}
