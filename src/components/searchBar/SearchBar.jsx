import css from './SearchBar.module.css';
import { GoSearch } from 'react-icons/go';

export const SearchBar = props => {
  const { onHandleSubmit, onHandleChange } = props;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <GoSearch />
          {/* <span className={css['SearchForm-button-label']}>Search</span> */}
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
