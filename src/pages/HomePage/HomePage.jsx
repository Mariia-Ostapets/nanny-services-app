import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';
import Container from '../../components/ui/Container/Container';

export default function HomePage() {
  return (
    <Container>
      <div className={css.homePageContainer}>
        <div className={css.homePageTitleWrapper}>
          <h1 className={css.homePageTitle}>
            Make Life Easier for the Family:
          </h1>
          <p className={css.homePageText}>
            Find Babysitters Online for All Occasions
          </p>
          <NavLink className={css.getStartedLink} to={'/nannies'}>
            <span className={css.linkText}>Get started</span>
            <svg width="15" height="17">
              <use href="/sprite.svg#icon-arrow" />
            </svg>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}
