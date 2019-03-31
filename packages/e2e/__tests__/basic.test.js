import * as graphRequest from '../utils/graphRequest';
import config from '../jest-puppeteer.config';

const timeout = 30000;

const openPage = (pageUrl = '/') =>
  global.page.goto(`http://localhost:${config.server.port}${pageUrl}`);

describe('Basic integration', () => {
  let topStoriesResponse;

  beforeAll(async () => {
    const response = await graphRequest.makeGraphRequest(
      graphRequest.queries.topStoriesQuery,
    );

    topStoriesResponse = response.topStories;

    await openPage();
  }, timeout);

  it(
    'loads the index',
    async () => {
      await expect(global.page).toMatch(topStoriesResponse[0].title);
    },
    timeout,
  );
});
