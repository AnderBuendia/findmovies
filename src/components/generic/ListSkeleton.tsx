import { SkeletonCircle, Skeleton, Box } from '@chakra-ui/react';

const ListSkeleton: React.FC = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Skeleton height="250px" />

      <Box
        p="6"
        d="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Skeleton height="10px" width="200px" />
        <SkeletonCircle my="10px" size="12" />
        <Skeleton height="10px" width="140px" />
      </Box>
    </Box>
  );
};

export default ListSkeleton;
