import React, { Component } from 'react';
import { STATUS, fetchImage } from '../services/index';
import {
  SearchBar,
  ImageGallery,
  Loader,
  Button,
  Modal,
  Message,
} from './index';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: null,
    status: STATUS.IDLE,
    showModal: false,
    currentIndex: null,
  };

  totalHits = null;

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      try {
        if (!this.state.query) return;
        await this.setState({ page: 1, status: STATUS.LOADING });
        const { page, query } = this.state;
        const data = await fetchImage(query, page);
        this.totalHits = data.totalHits;

        this.setState({
          images: this.normalizedData(data.hits),
          status: STATUS.LOADED,
        });
      } catch (error) {
        this.setState({ error: error.message, status: STATUS.ERROR });
      }
    }

    if (prevState.page < this.state.page) {
      try {
        const { page, query } = this.state;
        this.setState({ status: STATUS.LOADING });
        const data = await fetchImage(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...this.normalizedData(data.hits)],
          status: STATUS.LOADED,
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUS.ERROR });
      }
    }
  }

  normalizedData = data => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return { id, tags, webformatURL, largeImageURL };
    });
  };

  onHandleSubmit = value => {
    this.setState({ query: value });
  };

  onHandleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = id => {
    this.setState({
      showModal: true,
    });
    document.addEventListener('keydown', this.onKeyClick);
    const index = this.state.images.findIndex(image => image.id === id);
    this.setState({ currentIndex: index });
  };

  onKeyClick = async e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
    }
    if (e.code === 'ArrowRight') {
      this.changeIndex(1);
    }
    if (e.code === 'ArrowLeft') {
      this.changeIndex(-1);
    }
  };

  onMouseClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ showModal: false });
    }
  };

  changeIndex = value => {
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
    const { images, error, status, showModal } = this.state;
    const currentImage = this.state.images[this.state.currentIndex];

    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} />
        {error && <Message>{`${error}. Try to reload your page!`}</Message>}
        {!images.length && status === STATUS.LOADED && (
          <Message>
            Nothing found. Try searching with a different parameter!
          </Message>
        )}
        {!!images.length && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}

        {(status === STATUS.IDLE || status === STATUS.LOADED) &&
          !!images.length && (
            <Button
              onHandleClick={this.onHandleClick}
              disabled={images.length >= this.totalHits}
            />
          )}
        {status === STATUS.LOADING && <Loader />}
        {showModal && (
          <Modal
            image={currentImage}
            onKeyClick={this.onKeyClick}
            onMouseClick={this.onMouseClick}
            changeIndex={this.changeIndex}
            totalImages={this.state.images.length}
            currentPosition={this.state.currentIndex + 1}
          />
        )}
      </div>
    );
  }
}
