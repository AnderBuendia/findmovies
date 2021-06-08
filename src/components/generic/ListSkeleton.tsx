import { Skeleton, Stack } from '@chakra-ui/react';

const ListSkeleton: React.FC = () => {
  return (
    <Stack>
      <Skeleton height="20px" my="10px" />
      <Skeleton height="20px" my="10px" />
      <Skeleton height="20px" my="10px" />
    </Stack>
  );
};

export default ListSkeleton;
