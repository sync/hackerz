import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { make as App } from '../app/App.bs';
import { mockFetchTopStoriesOnce } from './utils/fetchMocks';
import client from './utils/graphQLClient';

describe('Initial Test of the App', () => {
  let topStories;

  beforeEach(() => {
    topStories = mockFetchTopStoriesOnce();
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  test('To render home page', async () => {
    const { getByText } = render(<App client={client} />);

    expect(getByText('HELLO')).toBeTruthy();

    await waitForElement(() => getByText(topStories[0].title));
    await waitForElement(() => getByText(topStories[1].title));

    const link = getByText('See some more');
    expect(link).toBeTruthy();

    fireEvent.click(link);
    await waitForElement(() => getByText('More'));
  });
});
