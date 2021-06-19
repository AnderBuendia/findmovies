import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export type CircularScoreProps = {
  rating: number;
};

const CircularScore: React.FC<CircularScoreProps> = ({ rating }) => {
  let barColor = 'blue.400';

  switch (true) {
    case rating >= 80:
      barColor = 'green.400';
      break;
    case rating >= 50 && rating <= 79:
      barColor = 'yellow.400';
      break;
    case rating <= 49:
      barColor = 'red.400';
      break;
    default:
      barColor;
  }

  return (
    <CircularProgress
      p={0.5}
      boxShadow="lg"
      trackColor="gray.600"
      color={barColor}
      bgColor="blue.800"
      rounded="full"
      value={rating}
      size="60px"
    >
      <CircularProgressLabel fontWeight="bold" fontSize="md" color="white">
        {rating}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default CircularScore;
