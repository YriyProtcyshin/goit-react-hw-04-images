// import css from "./ImageGallery.module.css"

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGalery({ items }) {
  return (
    <>
      {items.map(item => (
        <img key={item.id} src={item.previewURL} alt={item.tags} />
      ))}
    </>
  );
}
