import PropTypes from 'prop-types';
import { HeaderContainer } from './Header.styled';

export const Header = ({ children }) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

Header.propTypes = { children: PropTypes.node.isRequired };
