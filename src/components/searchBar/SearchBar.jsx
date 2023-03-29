import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import css from './SearchBar.module.css';

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
    if (!this.state.querySearch.trim()) return;
    this.props.onSubmit(this.state.querySearch.trim());
  };

  render() {
    const { querySearch } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <GoSearch />
          </button>
          <input
            className={css['SearchForm-input']}
            type="text"
            name="query"
            value={querySearch}
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
            onChange={this.onHandleChange}
          />
        </form>
      </header>
    );
  }
}
