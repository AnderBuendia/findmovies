import { render } from '@testing-library/react';
import SearchGenresPage from '@Pages/search/genres';
import useSearchGenre from '@Lib/hooks/useSearchGenre';

const searchGenresProps = [
  {
    id: 29,
    title: 'F9',
    poster: 'F9 Poster',
    vote_average: 7.8,
    vote_count: 800,
  },
];

const mockedUseSearchGenre = useSearchGenre as jest.Mock<any>;

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('@Lib/hooks/useSearchGenre');

describe('Shows search genres page content', () => {
  beforeEach(() => {
    mockedUseSearchGenre.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<SearchGenresPage />);
  });

  it('Displays error message from useSearchGenre', () => {
    mockedUseSearchGenre.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: 'Unable to fetch the movie data' },
    }));

    const { getByText } = render(<SearchGenresPage />);

    expect(getByText(/unable to fetch the movie data/i)).toBeTruthy();
  });

  it('Displays search Genre', () => {
    mockedUseSearchGenre.mockImplementation(() => ({
      isLoading: false,
      data: searchGenresProps,
    }));

    const { getByText } = render(<SearchGenresPage />);

    expect(getByText('F9')).toBeVisible();
  });
});
