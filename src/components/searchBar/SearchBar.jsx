import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';

import { SearchForm, Button, Input } from './SearchBar.styled';

export class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { querySearch: '' };

  onHandleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ querySearch: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { querySearch } = this.state;
    const { onSubmit } = this.props;
    if (!querySearch.trim()) return;
    onSubmit(querySearch.trim().toLowerCase());
  };

  render() {
    const { querySearch } = this.state;

    return (
      <SearchForm onSubmit={this.onSubmit}>
        <Button type="submit">
          <GoSearch />
        </Button>
        <Input
          type="text"
          name="query"
          value={querySearch}
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
          onChange={this.onHandleChange}
        />
      </SearchForm>
    );
  }
}
