import config from '../jest-puppeteer.config';

const timeout = 30000;

const openPage = (pageUrl = '/') =>
  global.page.goto(`http://localhost:${config.server.port}${pageUrl}`);

describe('Basic integration', () => {
  beforeAll(async () => {
    await openPage();
  }, timeout);

  it(
    'can loads the index',
    async () => {
      await expect(global.page).toMatch('HELLO');
    },
    timeout,
  );
});
