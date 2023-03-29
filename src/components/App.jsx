import React, { Component } from 'react';
import { SearchBar, ImageGallery, Header } from './index';
import { GlobalStyle } from 'globalStyle/GlobalStyle';
import { Layout } from './Layout.styled';

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
      <Layout>
        <Header>
          <SearchBar onSubmit={this.onHandleSubmit} />
        </Header>
        <ImageGallery
          querySearch={query}
          nextPage={page}
          loadMore={this.loadMore}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
