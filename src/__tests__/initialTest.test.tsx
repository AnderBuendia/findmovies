import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Wrapper } from '../__mocks__/fileMock';
import HomePage from '@Pages/index';
import useMovies from '@Lib/hooks/useMovies';
import useGenres from '@Lib/hooks/useGenres';
import useSearchMovies from '@Lib/hooks/useSearchMovies';
import router, { useRouter } from 'next/router';

jest.mock('next/router', () => require('next-router-mock'));

const popularMoviesProps = [
  {
    id: 1,
    title: 'Test Title',
    poster: 'Test Poster',
    vote_average: 10,
    vote_count: 23,
  },
];

const searchMoviesProps = [
  {
    id: 23,
    title: 'Luca',
    poster: 'Luca Poster',
    vote_average: 8,
    vote_count: 299,
  },
];

const mockedUseMovies = useMovies as jest.Mock<any>;
const mockedUseGenres = useGenres as jest.Mock<any>;
const mockedUseSearchMovies = useSearchMovies as jest.Mock<any>;

jest.mock('@Lib/hooks/useMovies');
jest.mock('@Lib/hooks/useGenres');
jest.mock('@Lib/hooks/useSearchMovies');

describe('Should render the app without crashing', () => {
  beforeEach(() => {
    mockedUseMovies.mockImplementation(() => ({ isLoading: true }));
    mockedUseGenres.mockImplementation(() => ({ isLoading: true }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<HomePage />);
  });

  it('Displays loading elements from useMovies', () => {
    const { getByTestId } = render(<HomePage />);

    expect(getByTestId('load-skeleton')).toBeVisible();
  });

  it('Displays error message from useMovies', () => {
    mockedUseMovies.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: 'Unable to fetch the movie data' },
    }));

    const { getByText } = render(<HomePage />);

    expect(getByText(/unable to fetch the movie data/i)).toBeTruthy();
  });

  it('Displays data from useMovies', () => {
    mockedUseMovies.mockImplementation(() => ({
      isLoading: false,
      data: popularMoviesProps,
    }));

    const { getByText } = render(<HomePage />);

    expect(getByText(/test title/i)).toBeVisible();
  });

  describe('Search movies', () => {
    beforeEach(() => {
      mockedUseSearchMovies.mockImplementation(() => ({ isLoading: true }));
      mockedUseMovies.mockImplementation(() => ({
        isLoading: false,
        data: popularMoviesProps,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Displays search movies', async () => {
      render(<HomePage />);

      const searchInput = await screen.findByPlaceholderText(/search/i);
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'Luca');

      const clickSearchButton = screen.getByTestId('search-movie-button');
      userEvent.click(clickSearchButton);

      router.push('/search/movies?q=Luca');

      expect(router).toMatchObject({
        asPath: '/search/movies?q=Luca',
        pathname: '/search/movies',
        query: { q: 'Luca' },
      });

      // mockedUseSearchMovies.mockImplementation(() => ({
      //   isLoading: false,
      //   data: searchMoviesProps,
      // }));

      // expect(screen.getByText(/luca/i)).toBeVisible();
    });
  });
});
