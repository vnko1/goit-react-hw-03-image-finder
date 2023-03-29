import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { STATUS, fetchImage } from 'services';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Button } from 'components';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    querySearch: PropTypes.string.isRequired,
    nextPage: PropTypes.number.isRequired,
    imageLength: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  state = {
    images: [],
    status: STATUS.IDLE,
    error: null,
  };

  totalHits = null;

  async componentDidUpdate(prevProps, prevState) {
    // if (prevState.images.length !== images.length) {
    //   imageLength(images.length);
    // }

    if (prevProps.querySearch !== this.props.querySearch) {
      try {
        const { querySearch, nextPage } = this.props;
        this.setState({ status: STATUS.PENDING });
        const data = await fetchImage(querySearch, nextPage);
        this.totalHits = data.totalHits;
        this.setState({
          images: this.normalizedData(data.hits),
          status: STATUS.RESOLVED,
        });
      } catch (error) {
        this.setState({ error: error.message, status: STATUS.ERROR });
      }

      if (prevProps.page < this.props.nextPage) {
        console.log(1);
        try {
          const { querySearch, nextPage } = this.props;
          this.setState({ status: STATUS.PENDING });
          console.log(2);
          const data = await fetchImage(querySearch, nextPage);
          this.setState(prevState => ({
            images: [...prevState.images, ...this.normalizedData(data.hits)],
            status: STATUS.RESOLVED,
          }));
        } catch (error) {
          this.setState({ error: error.message, status: STATUS.ERROR });
        }
      }
    }
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  };

  render() {
    const { images } = this.state;
    const { loadMore, disabled } = this.props;
    if (!images.length) {
    }
    return (
      <>
        <ul className={css.ImageGallery}>
          {images.map(image => {
            return (
              <li
                key={image.id}
                className={css.ImageGalleryItem}
                onClick={() => {}}
              >
                <ImageGalleryItem src={image.webformatURL} alt={image.tags} />
              </li>
            );
          })}
        </ul>
        {!!images.length && <Button loadMore={loadMore} disabled={disabled} />}
      </>
    );
  }
}
