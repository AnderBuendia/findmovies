import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export type CircularScoreProps = {
  rating: number;
};

const CircularScore: React.FC<CircularScoreProps> = ({ rating }) => {
  let circularColor = 'blue.400';

  switch (true) {
    case rating >= 80:
      circularColor = 'green.400';
      break;
    case rating >= 50 && rating <= 79:
      circularColor = 'yellow.400';
      break;
    case rating <= 49:
      circularColor = 'red.400';
      break;
    default:
      circularColor;
  }

  return (
    <CircularProgress
      p={0.5}
      boxShadow="lg"
      trackColor="gray.600"
      color={circularColor}
      bgColor="blue.800"
      rounded="full"
      value={rating}
      size="60px"
    >
      <CircularProgressLabel fontWeight="bold" fontSize="sm" color="white">
        {rating}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default CircularScore;
