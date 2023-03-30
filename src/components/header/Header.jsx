import PropTypes from 'prop-types';
import { HeaderContainer } from './Header.styled';

export const Header = ({ children }) => (
  <HeaderContainer>{children}</HeaderContainer>
);

Header.propTypes = { children: PropTypes.node.isRequired };
