import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import { STATUS, fetchImage } from 'services';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import { Button, Loader, Modal, Message } from 'components';
import { ImageGalleryList, ImageGalleryItems } from './ImageGallery.styled';

export class ImageGallery extends Component {
  static propTypes = {
    querySearch: PropTypes.string.isRequired,
    nextPage: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    currentIndex: null,
    status: STATUS.IDLE,
    showModal: false,
    error: null,
  };

  totalHits = null;

  async componentDidUpdate(prevProps) {
    const { querySearch, nextPage } = this.props;
    if (prevProps.querySearch !== querySearch) {
      try {
        this.setState({ status: STATUS.PENDING, error: null });
        const { totalHits, hits } = await fetchImage(querySearch, nextPage);
        this.totalHits = totalHits;
        this.setState({
          images: this.normalizedData(hits),
          status: STATUS.RESOLVED,
        });
      } catch (error) {
        this.setState({ error, status: STATUS.ERROR });
      }
    }
    if (prevProps.nextPage < nextPage) {
      try {
        this.setState({ status: STATUS.PENDING, error: null });
        const { hits } = await fetchImage(querySearch, nextPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...this.normalizedData(hits)],
          status: STATUS.RESOLVED,
        }));
        scroll.scrollToBottom();
      } catch (error) {
        this.setState({ error, status: STATUS.ERROR });
      }
    }
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  };

  setCurrentIndex = id => {
    const { images } = this.state;
    const index = images.findIndex(image => image.id === id);
    this.setState({ currentIndex: index });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  changeCurrentIndex = value => {
    const { currentIndex, images } = this.state;
    if (currentIndex + value < 0) {
      this.setState({ currentIndex: images.length - 1 });
      return;
    }
    if (currentIndex + value > images.length - 1) {
      this.setState({
        currentIndex: 0,
      });
      return;
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + value,
    }));
  };

  render() {
    const { images, status, showModal, error, currentIndex } = this.state;
    const { loadMore } = this.props;
    const currentImage = images[currentIndex];
    return (
      <>
        <ImageGalleryList>
          {images.map(({ id, ...otherProps }) => {
            return (
              <ImageGalleryItems
                key={id}
                onClick={() => {
                  this.setCurrentIndex(id);
                  this.toggleModal();
                }}
              >
                <ImageGalleryItem {...otherProps} />
              </ImageGalleryItems>
            );
          })}
        </ImageGalleryList>
        {!!images.length && status === STATUS.RESOLVED && (
          <Button
            loadMore={loadMore}
            disabled={images.length >= this.totalHits}
          />
        )}
        {status === STATUS.PENDING && <Loader />}
        {showModal && (
          <Modal
            image={currentImage}
            toggleModal={this.toggleModal}
            changeCurrentIndex={this.changeCurrentIndex}
            totalImages={images.length}
            currentPosition={currentIndex + 1}
          />
        )}
        {error && <Message>{`${error}. Try to reload your page!`}</Message>}
        {!images.length && status === STATUS.RESOLVED && (
          <Message>
            Nothing found. Try searching with a different parameter!
          </Message>
        )}
      </>
    );
  }
}
