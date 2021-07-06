import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@Pages/index';
import useMovies from '@Lib/hooks/useMovies';
import useGenres from '@Lib/hooks/useGenres';
import router from 'next/router';

const popularMoviesProps = [
  {
    id: 13,
    title: 'Test Title',
    poster: 'Test Poster',
    vote_average: 10,
    vote_count: 23,
  },
];

const genresProps = [
  {
    id: 28,
    name: 'Action',
  },
];

const mockedUseMovies = useMovies as jest.Mock<any>;
const mockedUseGenres = useGenres as jest.Mock<any>;

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('@Lib/hooks/useMovies');
jest.mock('@Lib/hooks/useGenres');

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

  describe('Show movies data', () => {
    beforeEach(() => {
      mockedUseMovies.mockImplementation(() => ({
        isLoading: false,
        data: popularMoviesProps,
      }));

      mockedUseGenres.mockImplementation(() => ({
        isLoading: false,
        data: genresProps,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Displays data from useMovies', () => {
      const { getByText } = render(<HomePage />);

      expect(getByText(/test title/i)).toBeVisible();
    });

    it('Redirect to search movies', async () => {
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
    });

    it('Redirect to search movies by genre', async () => {
      render(<HomePage />);

      router.push('/search/genres?q=28&name=Action');

      expect(router).toMatchObject({
        asPath: '/search/genres?q=28&name=Action',
        pathname: '/search/genres',
        query: { q: '28', name: 'Action' },
      });
    });

    it('Redirect to a movie', async () => {
      render(<HomePage />);

      router.push({
        pathname: '/movie/[id]',
        query: { id: '13' },
      });

      expect(router).toMatchObject({
        asPath: '/movie/13',
        pathname: '/movie/[id]',
      });
    });
  });
});
