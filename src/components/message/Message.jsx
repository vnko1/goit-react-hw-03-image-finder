import PropTypes from 'prop-types';
import { MessageContainer } from './Message.styled';

export const Message = ({ children }) => (
  <MessageContainer>{children}</MessageContainer>
);

Message.propTypes = { children: PropTypes.node.isRequired };
