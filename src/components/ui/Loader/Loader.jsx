import css from './Loader.module.css';
import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={css.loader}>
      <BeatLoader size={20} color={'#0957c3'} />
    </div>
  );
}
