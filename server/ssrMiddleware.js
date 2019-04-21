import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'fs';
const { GraphQLClient } = require('graphql-hooks');
const memCache = require('graphql-hooks-memcache');
const fetch = require('isomorphic-fetch');
import { getQueryParams } from './utils';

import { make as App } from '../app/App.bs.js';

const rawHTML = readFileSync(`${__dirname}/../dist/index.html`, 'utf8');

module.exports = async (req, res) => {
  try {
    const {
      headers: { host },
    } = req;

    // host.includes('localhost') is definitely not good
    const url = `${
      host.includes('localhost') ? 'http' : 'https'
    }://${host}/api/graphql`;

    const cache = memCache();
    const client = new GraphQLClient({
      url,
      cache,
      fetch,
      ssrMode: true,
    });

    const queryParams = getQueryParams(req);
    const serverPath = queryParams.path || '';
    let app = <App client={client} serverPath={serverPath} />;
    // first render for ssr cache
    renderToStaticMarkup(app);

    // prefetch graphql queries
    let initialState = client.cache.getInitialState();
    if (client.ssrPromises.length) {
      await Promise.all(client.ssrPromises);
      // clear promises
      client.ssrPromises = [];
      // recurse there may be dependant queries
      initialState = client.cache.getInitialState();
    }

    client.ssrMode = false;
    const rendered = renderToString(app);

    res.setHeader('Content-Type', 'text/html');

    // hydrate react app
    const appString = '<div id="app">';

    // hydrate graphql state
    const scriptString = '<script type="text/javascript"></script>';

    const finalHTML = rawHTML
      .replace(appString, `<div id="app">${rendered}</div>`)
      .replace(
        scriptString,
        `<script type="text/javascript">
          window.__INITIAL_STATE__=${JSON.stringify(initialState).replace(
            /</g,
            '\\u003c',
          )};
        </script>`,
      );

    res.end(finalHTML);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end();
  }
};
