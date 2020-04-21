import React from 'react';
import { render } from '@testing-library/react';
import App from './components/App';

test('renders header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/iTUNES ALBUM SEARCH/i);
  expect(linkElement).toBeInTheDocument();
});
