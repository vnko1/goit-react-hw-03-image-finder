import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ disabled, loadMore }) => {
  return (
    <button
      type="button"
      className={css.Button}
      disabled={disabled}
      onClick={loadMore}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};
