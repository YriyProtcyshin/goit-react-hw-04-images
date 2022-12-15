// import css from "./ImageGallery.module.css"

export function ImageGalery({ items }) {
  return (
    <>
      {items.map(item => (
        <img
          key={item.id}
          src={item.previewURL}
          alt={item.tags}
          width="200px"
          height="150px"
        />
      ))}
    </>
  );
}
