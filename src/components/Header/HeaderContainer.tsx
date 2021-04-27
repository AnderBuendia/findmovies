import { Flex, useColorModeValue } from '@chakra-ui/react';

const HeaderContainer: React.FC = ({ children }) => {
  const bgColor = useColorModeValue(
    'linear(to-r, purple.50, cyan.50)',
    'gray.500'
  );

  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      px={6}
      py={2}
      boxShadow="xs"
      bgGradient={bgColor}
      color={textColor}
    >
      {children}
    </Flex>
  );
};

export default HeaderContainer;
