import { Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type SelectMovieProps = {
  children: ReactNode;
  discoverTitle: string;
};

const SelectMovie: React.FC<SelectMovieProps> = ({
  children,
  discoverTitle,
}) => {
  return (
    <Flex direction="row" alignItems="center" justifyContent="space-between">
      <Heading as="h2">{discoverTitle}</Heading>
      <Flex
        borderWidth="1px"
        alignItems="center"
        direction="row"
        rounded="full"
        fontWeight="bold"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default SelectMovie;
