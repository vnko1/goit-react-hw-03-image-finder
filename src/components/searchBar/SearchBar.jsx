import css from './SearchBar.module.css';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';

export const SearchBar = props => {
  const { onHandleSubmit, onHandleChange } = props;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <GoSearch />
        </button>
        <input
          className={css['SearchForm-input']}
          type="text"
          name="query"
          placeholder="Search images and photos"
          autoComplete="off"
          autoFocus
          onChange={onHandleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
};
