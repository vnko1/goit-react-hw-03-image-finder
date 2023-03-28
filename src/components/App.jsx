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
  };

  totalHits = null;
  currentId = null;

  async componentDidUpdate(_, prevState) {
    if (prevState.page < this.state.page) {
      try {
        this.setState({ status: STATUS.LOADING });
        const { page, query } = this.state;
        const data = await fetchImage(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: STATUS.LOADED,
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUS.ERROR });
      }
    }
  }

  onHandleSubmit = async e => {
    e.preventDefault();

    const { value } = e.target.elements.query;
    await this.setState({ page: 1, query: value, status: STATUS.LOADING });

    try {
      const { page, query } = this.state;
      const data = await fetchImage(query, page);
      this.totalHits = data.totalHits;
      this.setState({
        images: data.hits,
        status: STATUS.LOADED,
      });
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.ERROR });
    }
  };

  onHandleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  imageToShow = () => {
    return this.state.images.find(image => image.id === this.currentId);
  };

  openModal = id => {
    this.setState({
      showModal: true,
    });
    this.currentId = id;
    document.addEventListener('keydown', this.onKeyClick);
  };

  onKeyClick = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
    }
  };

  onMouseClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ showModal: false });
    }
  };

  render() {
    const { images, error, status, showModal } = this.state;
    return (
      <div className="App">
        <SearchBar onHandleSubmit={this.onHandleSubmit} />
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
            image={this.imageToShow()}
            onKeyClick={this.onKeyClick}
            onMouseClick={this.onMouseClick}
          />
        )}
      </div>
    );
  }
}
