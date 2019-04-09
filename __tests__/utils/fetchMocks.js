export function mockFetchTopStoriesOnce(
  delay = 0,
  topStories = require('../fixtures/topStories').default,
) {
  fetch.mockResponseOnce(
    () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              body: JSON.stringify({
                data: {
                  topStories,
                },
              }),
            }),
          delay,
        ),
      ),
  );

  return topStories;
}

export function mockFetchErrorResponseOnce(message = 'fake error message') {
  fetch.mockRejectOnce(new Error(message));

  return message;
}
