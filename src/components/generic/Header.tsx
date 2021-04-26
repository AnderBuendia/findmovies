import { useColorMode, Button } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  );
};

export default Header;
