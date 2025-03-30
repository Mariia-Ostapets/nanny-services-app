import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';
import Container from '../../components/ui/Container/Container';

export default function HomePage() {
  return (
    <div className={css.homePageContainer}>
      <div className={css.homePageTitleWrapper}>
        <h1 className={css.homePageTitle}>Make Life Easier for the Family:</h1>
        <p className={css.homePageText}>
          Find Babysitters Online for All Occasions
        </p>
        <NavLink className={css.getStartedLink} to={'/nannies'}>
          <span className={css.getStartedLinkText}>Get started</span>
          <svg className={css.getStartedLinkIcon} width="15" height="17">
            <use href="/sprite.svg#icon-arrow" />
          </svg>
        </NavLink>
      </div>
      <div className={css.banner}>
        <div className={css.bannerIconWrapper}>
          <svg className={css.bannerIcon} width="30" height="30">
            <use href="/sprite.svg#icon-check" />
          </svg>
        </div>
        <div className={css.bannerTextWrapper}>
          <p className={css.bannerTextTop}>Experienced nannies</p>
          <p className={css.bannerTextBottom}>15,000</p>
        </div>
      </div>
    </div>
  );
}
