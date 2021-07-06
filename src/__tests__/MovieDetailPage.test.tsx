import { render } from '@testing-library/react';
import MovieDetailPage from '@Pages/movie/[id]';
import useMovie from '@Lib/hooks/useMovie';
import router from 'next/router';

const movieDetailProps = {
  title: 'Test Title',
  tagline: 'Test Tagline',
  genres: [{ id: 28, name: 'Action' }],
  cast: [{ character: 'Test Actor', name: 'Test Actor Name' }],
};

jest.mock('next/router', () => require('next-router-mock'));

const mockedUseMovie = useMovie as jest.Mock<any>;
jest.mock('@Lib/hooks/useMovie');

describe('Should render the app without crashing', () => {
  beforeEach(() => {
    mockedUseMovie.mockImplementation(() => ({ isLoading: true }));
    router.query = { id: '13' };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<MovieDetailPage />);
  });

  it('Displays loading elements from useMovies', () => {
    const { getByTestId } = render(<MovieDetailPage />);

    expect(getByTestId('loading-spinner')).toBeVisible();
  });

  it('Displays error message from useMovies', () => {
    mockedUseMovie.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: 'Unable to fetch the movie data' },
    }));

    const { getByText } = render(<MovieDetailPage />);

    expect(getByText(/unable to fetch the movie data/i)).toBeTruthy();
  });

  describe('Show movies data', () => {
    beforeEach(() => {
      mockedUseMovie.mockImplementation(() => ({
        isLoading: false,
        data: movieDetailProps,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Displays data from useMovies', () => {
      const { getByText } = render(<MovieDetailPage />);

      expect(getByText(/test title/i)).toBeVisible();
    });
  });
});
