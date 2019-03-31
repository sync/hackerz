import React from 'react';
import { render } from 'react-testing-library';
import * as GraphqlHooks from '../../app/GraphqlHooks.bs';
import { make as Home } from '../../app/pages/Home.bs';

jest.mock('../../app/GraphqlHooks.bs');

describe('Home', () => {
  beforeEach(() => {
    GraphqlHooks.useQuery = jest.fn().mockResolvedValue({
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

  test('To render some welcome text', () => {
    const { getByText } = render(<Home />);
    expect(getByText('HELLO')).toBeTruthy();
  });
});
