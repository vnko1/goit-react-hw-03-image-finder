import React, { Component } from 'react';
import { fetchImage } from 'services/api';
import { STATUS } from 'services/constans';
import { SearchBar } from './searchBar/SearchBar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Button } from './button/Button';
import { Loader } from './loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    error: null,
    status: STATUS.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
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

  onHandleSubmit = async e => {
    e.preventDefault();

    try {
      const { page, query } = this.state;
      const data = await fetchImage(query, page);

      this.totalHits = data.totalHits;

      this.setState({
        images: data.hits,
        page: 1,
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

  totalHits = null;

  render() {
    const { images, error, status } = this.state;
    return (
      <div className="App">
        <SearchBar
          onHandleSubmit={this.onHandleSubmit}
          onHandleChange={this.onHandleChange}
        />
        {error && <div>{`${error}. Try to reload your page!`}</div>}
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
