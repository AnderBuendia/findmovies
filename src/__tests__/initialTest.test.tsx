import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '@Pages/index';
import MockTheme from '../__mocks__/fileMock';

const popularMoviesProps = {
  id: 1,
  title: 'Test Title',
  poster: 'Test Poster',
  rating: 10,
};

describe('Initial tests', () => {
  test('Check Home', () => {
    render(
      <MockTheme>
        <HomePage popularMovies={[popularMoviesProps]} />
      </MockTheme>
    );

    const indexHeading = screen.getByRole('heading', {
      name: /title/i,
    });
    expect(indexHeading).toBeInTheDocument();
  });
});
