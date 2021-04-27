import { Flex } from '@chakra-ui/react';
import MenuItem from './MenuItem';

const MenuMobileDropdown: React.FC = () => {
  return (
    <Flex
      width="100%"
      justify="center"
      display={['column', 'column', 'none']}
      mt={2}
    >
      <MenuItem to="/">Home</MenuItem>

      <MenuItem to="/about">About</MenuItem>

      <MenuItem to="/contact">Contact</MenuItem>
    </Flex>
  );
};

export default MenuMobileDropdown;
