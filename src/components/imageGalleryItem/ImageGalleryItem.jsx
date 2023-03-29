import PropTypes from 'prop-types';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt }) => {
  return <ImageGalleryItemImage src={src} alt={alt} />;
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
