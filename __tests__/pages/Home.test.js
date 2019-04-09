import React from 'react';
import { render, waitForElement } from '../utils/testUtils';
import { make as Home } from '../../app/pages/Home.bs';
import {
  mockFetchTopStoriesOnce,
  mockFetchErrorResponseOnce,
} from '../utils/fetchMocks';

describe('Home', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  test('To successfully render top stories', async () => {
    let delay = 10;
    const topStories = mockFetchTopStoriesOnce(delay);

    const { getByText } = render(<Home />);
    expect(getByText('HELLO')).toBeTruthy();

    await waitForElement(() => getByText('Loading'));

    await waitForElement(() => getByText(topStories[0].title));
    await waitForElement(() => getByText(topStories[1].title));

    expect(getByText('See some more')).toBeTruthy();
  });

  test('To successfully render no top stories', async () => {
    mockFetchTopStoriesOnce(0, null);

    const { getByText } = render(<Home />);

    await waitForElement(() => getByText('No stories found'));
  });

  test('To error when fetching top stories', async () => {
    const errorMessage = mockFetchErrorResponseOnce();

    const { getByText } = render(<Home />);

    await waitForElement(() => getByText(errorMessage));
  });
});
