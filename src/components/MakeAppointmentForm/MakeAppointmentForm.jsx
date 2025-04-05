import css from './MakeAppointmentForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button/Button';
import { toast } from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(10, 'Maximum 10 characters'),
});

export default function MakeAppointmentForm({ closeModal, nannie }) {
  const onSubmit = data => {
    console.log(data);
    console.log('send');
    toast.success(
      'The appointment with babysitter has been successfully scheduled! The manager will contact you shortly to clarify the details.'
    );
    closeModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className={css.makeAppForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.formTitle}>Make an appointment with a babysitter</h2>
      <p className={css.formDescription}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>
      <div className={css.nannieInfoContainer}>
        <div className={css.nannieAvatarWrapper}>
          <img
            className={css.nannieAvatar}
            src={nannie.avatar_url}
            alt={nannie.name}
            width="44px"
            height="44px"
          />
        </div>
        <div className={css.nannieNameWrapper}>
          <p className={css.nannieTitle}>Your nanny</p>
          <h3 className={css.nannieName}>{nannie.name}</h3>
        </div>
      </div>
      <input {...register('name')} type="text" placeholder="Your name" />
      <Button type="submit" variant="signUpLogInModalSend">
        Send
      </Button>
    </form>
  );
}
