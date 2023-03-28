import PropTypes from 'prop-types';
import css from './Message.module.css';

export const Message = ({ children }) => (
  <p className={css.Message}>{children}</p>
);

Message.propTypes = { children: PropTypes.node.isRequired };
