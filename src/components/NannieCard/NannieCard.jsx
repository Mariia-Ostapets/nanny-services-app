import FavoritesBtn from '../FavoritesBtn/FavoritesBtn';
import Button from '../ui/Button/Button';
import css from './NannieCard.module.css';
import { calculateAge, getCharactersToString } from '../../utils/index';
import Reviews from '../Reviews/Reviews';
import { useState } from 'react';

export default function NannnieCard({ nannie }) {
  const [openReviews, setOpenReviews] = useState(false);

  const handleClick = () => {
    setOpenReviews(true);
  };

  return (
    <div className={css.nannieCardContainer}>
      <div className={css.nannieAvatarWrapper}>
        <img
          className={css.nannieAvatar}
          src={nannie.avatar_url}
          alt={nannie.name}
          width="96px"
          height="96px"
        />
      </div>
      <div className={css.nannieInfo}>
        <div className={css.nannieTopInfoWrapper}>
          <div className={css.nannieTitleAndNameWrapper}>
            <h2 className={css.nannieTitle}>Nanny</h2>
            <h3 className={css.nannieName}>{nannie.name}</h3>
          </div>
          <div className={css.infoAndFavBtnWrapper}>
            <div className={css.infoWrapper}>
              <div className={css.infoItemWrapper}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href={'/sprite.svg#icon-map-pin'} />
                </svg>
                <p>{nannie.location}</p>
              </div>
              <div className={css.infoItemWrapper}>
                <svg width="16" height="16">
                  <use href={'/sprite.svg#icon-star'} />
                </svg>
                <p>{nannie.rating}</p>
              </div>
              <div className={css.infoItemWrapper}>
                <p>Price / 1 hour:</p>
                <p className={css.priceText}>{nannie.price_per_hour}$</p>
              </div>
            </div>
            <FavoritesBtn nannie={nannie} />
          </div>
        </div>
        <ul className={css.infoList}>
          <li className={css.infoListItem}>
            <p className={css.infoListItemTitle}>Age:</p>
            <p className={`${css.infoListItemInfo} ${css.nannieAge}`}>
              {calculateAge(nannie.birthday)}
            </p>
          </li>
          <li className={css.infoListItem}>
            <p className={css.infoListItemTitle}>Experience:</p>
            <p className={css.infoListItemInfo}>{nannie.experience}</p>
          </li>
          <li className={css.infoListItem}>
            <p className={css.infoListItemTitle}>Kids age:</p>
            <p className={css.infoListItemInfo}>{nannie.kids_age}</p>
          </li>
          <li className={css.infoListItem}>
            <p className={css.infoListItemTitle}>Characters:</p>
            <p className={css.infoListItemInfo}>
              {getCharactersToString(nannie.characters)}
            </p>
          </li>
          <li className={css.infoListItem}>
            <p className={css.infoListItemTitle}>Education:</p>
            <p className={css.infoListItemInfo}>{nannie.education}</p>
          </li>
        </ul>
        <p className={css.nannieDescription}>{nannie.about}</p>
        {!openReviews ? (
          <Button type="button" variant="readMore" onClick={handleClick}>
            Read more
          </Button>
        ) : (
          <Reviews nannie={nannie} />
        )}
      </div>
    </div>
  );
}
