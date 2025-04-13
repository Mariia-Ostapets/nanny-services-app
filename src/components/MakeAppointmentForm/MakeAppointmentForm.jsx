import css from './MakeAppointmentForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../ui/Button/Button';
import { toast } from 'react-hot-toast';
import TimePicker from '../ui/TimePicker/TimePicker';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  tel: yup
    .string()
    .required('Phone is required')
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX'),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? undefined : value
    )
    .required('Age is required')
    .min(0, 'Age can be from 0 to 14 years old.')
    .max(14, 'Age can be from 0 to 14 years old.'),
  time: yup.string().required('Time is required.'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  name: yup
    .string()
    .required('Name is required')
    .max(20, 'Maximum 20 characters'),
  comment: yup.string().max(200, 'Maximum 200 characters'),
});

export default function MakeAppointmentForm({ closeModal, nannie }) {
  const onSubmit = data => {
    toast.success(
      'The appointment with babysitter has been successfully scheduled! The manager will contact you shortly to clarify the details.'
    );
    closeModal();
  };

  const {
    register,
    handleSubmit,
    setValue,
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
      <div className={css.halfInputWrapper}>
        <input
          className={`${css.makeAppFormInput} ${css.halfInput}`}
          type="text"
          placeholder="Address"
          {...register('address')}
        />
        {errors.address && (
          <p className={css.errorMessageAddress}>{errors.address.message}</p>
        )}
        <input
          className={`${css.makeAppFormInput} ${css.halfInput}`}
          type="tel"
          placeholder="+380"
          {...register('tel')}
        />
        {errors.tel && (
          <p className={css.errorMessageTel}>{errors.tel.message}</p>
        )}
        <input
          className={`${css.makeAppFormInput} ${css.halfInput}`}
          type="number"
          placeholder="Child's age"
          {...register('age')}
        />
        {errors.age && (
          <p className={css.errorMessageAge}>{errors.age.message}</p>
        )}
        <TimePicker register={register} name="time" setValue={setValue} />
        {errors.time && (
          <p className={css.errorMessageTime}>{errors.time.message}</p>
        )}
      </div>
      <input
        className={`${css.makeAppFormInput} ${css.wholeInput}`}
        type="email"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email && (
        <p className={css.errorMessageEmail}>{errors.email.message}</p>
      )}
      <input
        className={`${css.makeAppFormInput} ${css.wholeInput}`}
        type="text"
        placeholder="Father's or mother's name"
        {...register('name')}
      />
      {errors.name && (
        <p className={css.errorMessageName}>{errors.name.message}</p>
      )}
      <textarea
        className={`${css.makeAppFormInput} ${css.wholeInput}`}
        type="text"
        placeholder="Comment"
        {...register('comment')}
      />
      {errors.comment && (
        <p className={css.errorMessageComment}>{errors.comment.message}</p>
      )}
      <Button type="submit" variant="signUpLogInModalSend">
        Send
      </Button>
    </form>
  );
}
