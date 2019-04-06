import topStories from '../fixtures/topStories';

export function mockFetchTopStoriesOnce(delay = 0) {
  fetch.mockResponseOnce(
    JSON.stringify({
      data: {
        topStories,
      },
    }),
  );

  return topStories;
}

export function mockFetchErrorResponseOnce(message = 'fake error message') {
  fetch.mockRejectOnce(new Error(message));

  return message;
}
