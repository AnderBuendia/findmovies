import { render, screen } from '@testing-library/react';
import { Wrapper } from '../__mocks__/fileMock';
import HomePage from '@Pages/index';
import useMovies from '@Lib/hooks/useMovies';
import useGenres from '@Lib/hooks/useGenres';

const popularMoviesProps = {
  id: 1,
  title: 'Test Title',
  poster: 'Test Poster',
  vote_average: 10,
  vote_count: 23,
};

const mockedUseMovies = useMovies as jest.Mock<any>;
const mockedUseGenres = useGenres as jest.Mock<any>;

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

  it('Display loading elements', () => {
    const { getByTestId } = render(<HomePage />);

    expect(getByTestId('load-skeleton')).toBeVisible();
  });

  // it('Should show trending on home page', async () => {

  //   // const indexHeading = screen.getByRole('heading', {
  //   //   name: /Trending/i,
  //   // });

  //   // expect(indexHeading).toBeInTheDocument();
  // });
});
