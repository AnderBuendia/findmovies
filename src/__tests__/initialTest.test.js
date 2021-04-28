import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';
import MockTheme from '../__mocks__/fileMock';

describe('Initial tests', () => {
  test('Check Home', () => {
    render(
      <MockTheme>
        <Home />
      </MockTheme>
    );

    const indexHeading = screen.getByRole('heading', {
      name: /title/i,
    });
    expect(indexHeading).toBeInTheDocument();
  });
});
