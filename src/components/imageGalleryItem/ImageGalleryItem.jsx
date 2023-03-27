import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt }) => {
  return <img src={src} alt={alt} className={css['ImageGalleryItem-image']} />;
};
