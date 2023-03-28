import React, { Component } from 'react';
import { STATUS, fetchImage } from '../services/index';
import { SearchBar, ImageGallery, Loader, Button } from './index';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: null,
    status: STATUS.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.page < this.state.page) {
      try {
        this.setState({ status: STATUS.PENDING });
        const { page, query } = this.state;
        const data = await fetchImage(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          status: STATUS.RESOLVED,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }
  totalHits = null;

  onHandleSubmit = async e => {
    e.preventDefault();
    try {
      await this.setState({ page: 1 });
      const { page, query } = this.state;
      const data = await fetchImage(query, page);
      this.totalHits = data.totalHits;
      this.setState({
        images: data.hits,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  onHandleChange = ({ currentTarget: { value } }) => {
    this.setState({ query: value });
  };

  onHandleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, status } = this.state;
    return (
      <div className="App">
        <SearchBar
          onHandleSubmit={this.onHandleSubmit}
          onHandleChange={this.onHandleChange}
        />
        {error && <p>{`${error}. Try to reload your page!`}</p>}
        {!!images.length && <ImageGallery images={this.state.images} />}

        {(status === STATUS.IDLE || status === STATUS.RESOLVED) &&
          !!images.length && (
            <Button
              onHandleClick={this.onHandleClick}
              disabled={images.length >= this.totalHits}
            />
          )}
        {status === STATUS.PENDING && <Loader />}
      </div>
    );
  }
}
