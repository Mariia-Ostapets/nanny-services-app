import { useId, useState } from 'react';
import css from './Reviews.module.css';
import ReviewsItem from '../ReviewsItem/ReviewsItem';
import Button from '../ui/Button/Button';
import ModalForm from '../ui/ModalForm/ModalForm';
import MakeAppointmentForm from '../MakeAppointmentForm/MakeAppointmentForm';

export default function Reviews({ nannie }) {
  const [modalContent, setModalContent] = useState(null);

  const openModal = content => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const baseId = useId();

  return (
    <>
      <ul className={css.reviewsList}>
        {nannie.reviews.map((review, index) => (
          <li key={`${baseId}-${index}`} className={css.reviewsListItem}>
            <ReviewsItem review={review} />
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="makeAppointment"
        onClick={() =>
          openModal(
            <MakeAppointmentForm nannie={nannie} closeModal={closeModal} />
          )
        }
      >
        Make an appointment
      </Button>
      <ModalForm
        modalIsOpen={!!modalContent}
        closeModal={closeModal}
        variant="makeAppointment"
      >
        {modalContent}
      </ModalForm>
    </>
  );
}
