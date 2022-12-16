import css from "./ImageGallery.module.css"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export function ImageGalery({ items, getActiveUrl }) {
  return (
    <ul className={css.ImageGallery}>
        <ImageGalleryItem items={items} getActiveUrl={getActiveUrl}/>
    </ul>
  );
}


