import css from './NannieCard.module.css';

export default function NannnieCard({ nannie }) {
  return <img src={nannie.avatar_url} alt={nannie.name} />;
}
