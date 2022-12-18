import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropsTypes from "prop-types"

export function ImageGalery({ items, getActiveUrl }) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem items={items} getActiveUrl={getActiveUrl} />
    </ul>
  );
}

ImageGalery.propTypes = {
  getActiveUrl: PropsTypes.func, 
}
