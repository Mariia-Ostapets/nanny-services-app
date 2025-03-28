import css from './Loader.module.css';
import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return <BeatLoader className={css.loader} size={20} color={'#0957c3'} />;
}
