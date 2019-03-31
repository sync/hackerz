import { GraphQLClient } from 'graphql-request';
import config from '../jest-puppeteer.config';

export async function makeGraphRequest(query, variables) {
  const client = new GraphQLClient(
    `http://localhost:${config.server.port}/api/graphql`,
  );
  return client.request(query, variables);
}

export const queries = {
  topStoriesQuery: `
    query TopStoriesQuery {
      topStories(page: 0) {
        id
        title
      }
    }
  `,
};
