import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

interface Props {
  name: string;
  path: string;
  onClose: () => void;
  props?: any;
}

const NavLink: React.FC<Props> = ({ name, path, onClose, props }) => {
  const style = {
    hover: 'teal',
    active: 'teal',
    inactive: 'blackAlpha.600',
  };
  const location = useLocation();
  const isActive = path === location.pathname;

  return (
    <Link
      fontWeight="medium"
      letterSpacing="tight"
      as={RouterLink}
      color={isActive ? style.active : style.inactive}
      to={path}
      px="2"
      py="1"
      lineHeight="inherit"
      rounded="md"
      _hover={{
        textDecoration: 'none',
        color: style.hover,
      }}
      onClick={() => onClose()}
      {...props}
    >
      {name}
    </Link>
  );
};

export default NavLink;
