import { render } from '@testing-library/react';
import SearchMoviesPage from '@Pages/search/movies';
import useSearchMovies from '@Lib/hooks/useSearchMovies';

const searchMoviesProps = [
  {
    id: 23,
    title: 'Luca',
    poster: 'Luca Poster',
    vote_average: 8,
    vote_count: 299,
  },
];

const mockedUseSearchMovies = useSearchMovies as jest.Mock<any>;

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('@Lib/hooks/useSearchMovies');

describe('Shows search movies page content', () => {
  beforeEach(() => {
    mockedUseSearchMovies.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<SearchMoviesPage />);
  });

  it('Displays error message from useSearchMovies', () => {
    mockedUseSearchMovies.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: 'Unable to fetch the movie data' },
    }));

    const { getByText } = render(<SearchMoviesPage />);

    expect(getByText(/unable to fetch the movie data/i)).toBeTruthy();
  });

  it('Displays search movies', () => {
    mockedUseSearchMovies.mockImplementation(() => ({
      isLoading: false,
      data: searchMoviesProps,
    }));

    const { getByText } = render(<SearchMoviesPage />);

    expect(getByText('Luca')).toBeVisible();
  });
});
