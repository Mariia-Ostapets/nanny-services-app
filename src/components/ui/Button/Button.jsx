import clsx from 'clsx';
import css from './Button.module.css';

export default function Button({ children, type, variant, ...rest }) {
  return (
    <button
      type={type}
      className={clsx(
        css.button,
        (variant === 'logIn' && css.logInBtn) ||
          (variant === 'registration' && css.registrationBtn) ||
          (variant === 'logOut' && css.logOutBtn) ||
          (variant === 'loadMore' && css.loadMoreBtn) ||
          (variant === 'readMore' && css.readMoreBtn) ||
          (variant === 'makeAppointment' && css.makeAppointmentBtn) ||
          (variant === 'readMore' && css.readMoreBtn) ||
          (variant === 'favourites' && css.favouritesBtn) ||
          (variant === 'signUpLogInModalSend' && css.signUpLogInModalSendBtn) ||
          (variant === 'close-modal' && css.closeModalBtn)
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
