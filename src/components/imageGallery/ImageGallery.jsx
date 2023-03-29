import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  async componentDidUpdate(prevProps, prevState) {
    const { querySearch, nextPage } = this.props;
    if (prevProps.querySearch !== this.props.querySearch) {
      try {
        this.setState({ status: STATUS.PENDING, error: null });
        const data = await fetchImage(querySearch, nextPage);
        this.totalHits = data.totalHits;
        this.setState({
          images: this.normalizedData(data.hits),
          status: STATUS.RESOLVED,
        });
      } catch (error) {
        this.setState({ error: error, status: STATUS.ERROR });
      }
    }
    if (prevProps.nextPage < this.props.nextPage) {
      try {
        this.setState({ status: STATUS.PENDING, error: null });
        const data = await fetchImage(querySearch, nextPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...this.normalizedData(data.hits)],
          status: STATUS.RESOLVED,
        }));
      } catch (error) {
        this.setState({ error: error, status: STATUS.ERROR });
      }
    }
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  };

  setCurrentIndex = id => {
    const index = this.state.images.findIndex(image => image.id === id);
    this.setState({ currentIndex: index });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  changeCurrentIndex = value => {
    if (this.state.currentIndex + value < 0) {
      this.setState({ currentIndex: this.state.images.length - 1 });
      return;
    }
    if (this.state.currentIndex + value > this.state.images.length - 1) {
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
    const { images, status, showModal, error } = this.state;
    const { loadMore } = this.props;
    const currentImage = this.state.images[this.state.currentIndex];
    return (
      <>
        <ImageGalleryList>
          {images.map(image => {
            return (
              <ImageGalleryItems
                key={image.id}
                onClick={() => {
                  this.setCurrentIndex(image.id);
                  this.toggleModal();
                }}
              >
                <ImageGalleryItem src={image.webformatURL} alt={image.tags} />
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
            totalImages={this.state.images.length}
            currentPosition={this.state.currentIndex + 1}
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
