import { Box } from '@chakra-ui/react';
import { Dates } from '@Enums/heading/dates.enum';

export type SelectorDateProps = {
  popularDate: string;
  handlePopularDate: (dateTitle: string) => void;
  dateTitle: string;
};

const DATE_TITLE = {
  [Dates.TODAY]: 'Today',
  [Dates.THIS_WEEK]: 'This Week',
};

const SelectorDate: React.FC<SelectorDateProps> = ({
  popularDate,
  handlePopularDate,
  dateTitle,
}) => {
  const headingDateTitle = DATE_TITLE[dateTitle] || 'Today';

  return (
    <Box
      px={5}
      py={1}
      layerStyle={popularDate === dateTitle ? 'selected' : null}
      _hover={{ cursor: 'pointer' }}
      onClick={() => handlePopularDate(dateTitle)}
    >
      {headingDateTitle}
    </Box>
  );
};

export default SelectorDate;
