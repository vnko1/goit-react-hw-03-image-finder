import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ disabled, onHandleClick }) => {
  return (
    <button
      type="button"
      className={css.Button}
      disabled={disabled}
      onClick={onHandleClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onHandleClick: PropTypes.func.isRequired,
};
