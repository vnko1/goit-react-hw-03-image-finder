import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return (
          <li
            key={image.id}
            className={css.ImageGalleryItem}
            onClick={() => openModal(image.id)}
          >
            <ImageGalleryItem src={image.webformatURL} alt={image.tags} />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ).isRequired,
};
