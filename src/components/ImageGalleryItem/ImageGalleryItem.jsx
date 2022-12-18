import css from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types"

export function ImageGalleryItem({ items, getActiveUrl }) {
  return (
    <>
      {items.map(item => (
        <li
          className={css.ImageGalleryItem}
          key={nanoid()}
          onClick={() => getActiveUrl(item)}
        >
          <img
            className={css.ImageGalleryItem_image}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string
    })),
    getActiveUrl:PropTypes.func
}
