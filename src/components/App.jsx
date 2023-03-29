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

  getImageLength = value => {
    return value;
  };

  onHandleSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  loadMore = () => {
    console.log('object');
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
    const { images, error, status, showModal, query, page } = this.state;
    const currentImage = this.state.images[this.state.currentIndex];

    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} status={status} />
        {/* {error && <Message>{`${error}. Try to reload your page!`}</Message>}
        {!images.length && status === STATUS.LOADED && (
          <Message>
            Nothing found. Try searching with a different parameter!
          </Message>
        )} */}

        <ImageGallery
          querySearch={query}
          nextPage={page}
          imageLength={this.getImageLength}
          loadMore={this.loadMore}
          disabled={images.length >= this.totalHits}
        />

        {/* {(status === STATUS.IDLE || status === STATUS.LOADED) &&
          !!images.length && (
            <Button
              loadMore={this.loadMore}
              disabled={images.length >= this.totalHits}
            />
          )} */}
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
