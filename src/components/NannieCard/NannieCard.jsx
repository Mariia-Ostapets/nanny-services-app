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
          <div>
            <h2>Nannie</h2>
            <h3></h3>
            {nannie.name}
          </div>
          <div>
            <FavoritesBtn nannie={nannie} />
          </div>
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
