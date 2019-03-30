import React from 'react';
import { render } from 'react-testing-library';
import App from '../app/App';

describe('App', () => {
  let client;

  it('renders the home page', () => {
    const { getByText } = render(<App client={client} />);

    expect(getByText('HELLO')).toBeTruthy();
  });
});
