import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';

interface MenuItemProps {
  isLast?: boolean;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  isLast,
  to = '/',
  ...rest
}) => {
  return (
    <NextLink href={to} passHref>
      <Button
        _hover={{ bgColor: 'transparent' }}
        as="a"
        variant="ghost"
        aria-label="Home"
        width="100%"
      >
        {children}
      </Button>
    </NextLink>
  );
};

export default MenuItem;
