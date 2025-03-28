import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

export default function NotFoundPage() {
  return (
    <div>
      <div className={css.notFoundWrapper}>
        <BiError size={54} />
        <h1>Page Not Found</h1>
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
