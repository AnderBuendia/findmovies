import { useColorMode, Flex, Button, IconButton, Link } from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FC, useState } from 'react';
import NextLink from 'next/link';
import HeaderContainer from '@Components/menu/HeaderContainer';
import MenuMobileDropdown from '@Components/menu/MenuMobileDropdown';
import LogoIcon from '@Components/icons/logo-icon';
import MenuItem from '@Components/menu/MenuItem';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <HeaderContainer>
      <NextLink href="/" passHref>
        <Link _focus={{ boxShadow: 'none' }}>
          <LogoIcon w={9} h={9} />
        </Link>
      </NextLink>

      <Flex align="center">
        <Flex display={['none', 'none', 'flex', 'flex']}>
          <MenuItem to="/">Home</MenuItem>

          <MenuItem to="#">About</MenuItem>

          <MenuItem to="#">Contact</MenuItem>
        </Flex>

        <IconButton
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          size="md"
          mr={2}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon w={6} h={6} />}
          display={['flex', 'flex', 'none', 'none']}
          bgColor="gray.100"
          onClick={toggle}
        />

        <Button onClick={toggleColorMode} ml={[0, 0, 3]} bgColor="gray.200">
          {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Flex>

      {isOpen && <MenuMobileDropdown />}
    </HeaderContainer>
  );
};

export default Header;
