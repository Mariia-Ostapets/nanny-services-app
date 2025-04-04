import FavoritesBtn from '../FavoritesBtn/FavoritesBtn';
import Button from '../ui/Button/Button';
import css from './NannieCard.module.css';

export default function NannnieCard({ nannie }) {
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
        <div>
          <div className={css.nannieTitleAndNameWrapper}>
            <h2 className={css.nannieTitle}>Nanny</h2>
            <h3 className={css.nannieName}>{nannie.name}</h3>
          </div>
          <div>
            <div>
              <div className={css.locationWrapper}>
                <svg className={css.locationIcon} width="16" height="16">
                  <use href={'/sprite.svg#icon-map-pin'} />
                </svg>
                <p className={css.locationText}>{nannie.location}</p>
              </div>
              <div>
                <svg className={css.starIcon} width="16" height="16">
                  <use href={'/sprite.svg#icon-star'} />
                </svg>
                <p className={css.locationText}>{nannie.rating}</p>
              </div>
              <div>
                <p className={css.priceTitle}>Price / 1 hour:</p>
                <p className={css.priceText}>{nannie.price_per_hour}$</p>
              </div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
          <FavoritesBtn nannie={nannie} />
        </div>
        <ul>
          <li></li>
        </ul>
        <Button type="button" variant="readMore">
          Read more
        </Button>
      </div>
    </div>
  );
}
