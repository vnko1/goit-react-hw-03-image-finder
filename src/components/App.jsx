import React, { Component } from 'react';
import { fetchImage } from 'services/api';
import { SearchBar } from './searchBar/SearchBar';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };

  onHandleSubmit = async e => {
    e.preventDefault();

    const { page, query } = this.state;
    const data = await fetchImage(query, page);

    this.setState({
      images: data.hits,
    });

    // this.setState(prevState => ({
    //   images: [...prevState.images, ...data.hits],
    // }));
  };

  onHandleChange = ({ currentTarget: { value } }) => {
    this.setState({ query: value });
  };

  render() {
    return (
      <div className="App">
        <SearchBar
          onHandleSubmit={this.onHandleSubmit}
          onHandleChange={this.onHandleChange}
        />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
