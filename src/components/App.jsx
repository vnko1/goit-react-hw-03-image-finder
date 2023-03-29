import React, { Component } from 'react';
import { SearchBar, ImageGallery } from './index';

export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  onHandleSubmit = value => {
    this.setState({ query: value, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { query, page } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.onHandleSubmit} />
        <ImageGallery
          querySearch={query}
          nextPage={page}
          loadMore={this.loadMore}
        />
      </div>
    );
  }
}
