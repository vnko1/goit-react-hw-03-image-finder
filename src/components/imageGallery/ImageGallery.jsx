import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <li key={image.id} className={css.ImageGalleryItem}>
          <ImageGalleryItem src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </ul>
  );
};
