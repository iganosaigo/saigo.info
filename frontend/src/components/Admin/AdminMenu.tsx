import React from 'react';
import {
  IconButton,
  Box,
  Menu,
  MenuDivider,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { GrConfigure } from 'react-icons/gr';
import { HiPlus } from 'react-icons/hi';
import { FaRegAddressCard } from 'react-icons/fa';
import ChangeMePassword from './ChangeMePassword';
import { useAppSelector, selectFullName } from '../../redux/hooks';

const commonParams = {
  fill: 'teal',
  size: '16',
};

const AdminMenu: React.FC<{}> = () => {
  const fullName = useAppSelector(selectFullName);
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          size="md"
          icon={<GrConfigure />}
          aria-label="Admin"
          variant="solid"
          isRound
        />
        <MenuList boxShadow="xl">
          <MenuGroup title={fullName}>
            <RouterLink to="/add-post">
              <MenuItem icon={<HiPlus {...commonParams} />}>Add Post</MenuItem>
            </RouterLink>
            <MenuDivider />
            <RouterLink to="/admin/users">
              <MenuItem icon={<FaRegAddressCard {...commonParams} />}>
                Manage Users
              </MenuItem>
            </RouterLink>
            <MenuDivider />
            <ChangeMePassword />
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AdminMenu;
