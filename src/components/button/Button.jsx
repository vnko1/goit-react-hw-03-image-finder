import PropTypes from 'prop-types';

import { LoadButton } from './Button.styled';

export const Button = ({ disabled, loadMore }) => {
  return (
    <LoadButton type="button" disabled={disabled} onClick={loadMore}>
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};
