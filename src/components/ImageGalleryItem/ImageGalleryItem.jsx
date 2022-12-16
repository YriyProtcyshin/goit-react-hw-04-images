import css from "./ImageGalleryItem.module.css"

export function ImageGalleryItem({items, getActiveUrl}){    
    return (
        <>
            {items.map(item => 
                <li
                    className={css.ImageGalleryItem}
                    key={item.id}
                    onClick={() => getActiveUrl(item)}
                >
                    <img className={css.ImageGalleryItem_image} src={item.previewURL} alt={item.tags} />
                </li>
            )}
        </>
    )
}

