import { getFirstLetter } from '../../utils';
import css from './ReviewsItem.module.css';

export default function ReviewsItem({ review }) {
  return (
    <>
      <div className={css.reviewTopWrapper}>
        <div className={css.avatarWrapper}>
          {getFirstLetter(review.reviewer)}
        </div>
        <div className={css.nameAndRatingWrapper}>
          <p>{review.reviewer}</p>
          <div className={css.ratingWrapper}>
            <svg width="16" height="16">
              <use href={'/sprite.svg#icon-star'} />
            </svg>
            <p>{review.rating}</p>
          </div>
        </div>
      </div>
      <p>{review.comment}</p>
    </>
  );
}
