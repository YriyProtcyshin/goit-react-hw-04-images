import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';


export function Loader() {
  return (
    <div className={css.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#f50505"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}


