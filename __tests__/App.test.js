import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { make as App } from '../app/App.bs';
import { GraphQLClient } from 'graphql-hooks';

describe('Initial Test of the App', () => {
  let client;

  beforeEach(() => {
    client = new GraphQLClient({ url: '/api/graphql' });
    client.request = jest.fn().mockResolvedValue({
      data: {
        topStories: [
          {
            title:
              'Scientists discover the chemicals behind the unique Parkinson’s smell',
            id: 19528250,
          },
          {
            title: 'The Day the Dinosaurs Died',
            id: 19526679,
          },
        ],
      },
    });
  });

  test('To render home page', () => {
    const { getByText } = render(<App client={client} />);

    expect(getByText('HELLO')).toBeTruthy();

    const link = getByText('See some more');
    expect(link).toBeTruthy();

    fireEvent.click(link);
    expect(getByText('More')).toBeTruthy();
  });
});
