import { Flex, useColorModeValue } from '@chakra-ui/react';

const HeaderContainer: React.FC = ({ children }) => {
  const bgColor = useColorModeValue('teal.50', 'gray.700');
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
      boxShadow="md"
      bgColor={bgColor}
      color={textColor}
    >
      {children}
    </Flex>
  );
};

export default HeaderContainer;
