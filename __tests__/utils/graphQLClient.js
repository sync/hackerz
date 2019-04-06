import { GraphQLClient } from 'graphql-hooks';

const client = new GraphQLClient({ url: 'https:/www.test-url.com' });
client.logErrorResult = jest.fn();

export default client;
