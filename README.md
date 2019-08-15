## hackerz

[View the application](https://hackerz.now.sh)

Ultra high performance progressive web application built with React + Reason (hooks, react ppx 3), GraphQL (api and client) and rollup.

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io)

## Features

- Progressive web app
  - offline
  - install prompts on supported platforms
- Server side rendering (including prefetching graphql queries for the current route)
- GraphQL (client using graphql-hooks)
- GrappQL (server, using reason-graphql)
- Rollup (dual bundling, module and nomodule)
- Now.sh 2.x
- Reason React (hooks, react ppx 3)
- Yarn (monorepo with workspaces)
- Routing (including ssr support, static routing)

## Things to know

- A production build is deployed from a merge to master
- A staging build is deployed from a PR against master

## Setting the project up locally

First of all make sure you are using node `8.11.3` and latest yarn, you can always have a look at the `engines` section of the `package.json`.

```sh
$ yarn (install)
$ yarn dev
```

After doing this, you'll have a server with hot-reloading (ui only) running at [http://localhost:8004](http://localhost:8004)

You can also start in production.

```sh
$ yarn start
```

After doing this, you'll have a server running at [http://localhost:8004](http://localhost:8004)

## If working on the graphql server and want hot reloading

```sh
$ yarn dev-graphql
```

After doing this, you'll have a server with hot-reloading running at [http://localhost:3000](http://localhost:3000)

## When changing the graphql server schema

```sh
$ yarn send-introspection-query http://localhost:8004/api/graphql
```

## Run tests and friends

We don't want to use snapshots, we use also use [react-testing-library](https://github.com/testing-library/react-testing-library) to avoid having to use enzyme and to enforce best test practices.

```sh
$ yarn lint
$ yarn build
$ yarn test
```

or

```sh
$ yarn ci
```

## End to end tests

The end to end test go fetch latest news from the server and expect it to be found inside the homepage. Please check `e2e/basic.test.js` for more details.

```sh
$ yarn e2e
```

## Storybook

This is where we list all our components (comes with hot reloading)

```sh
$ yarn storybook
```

After doing this, you'll have a showcase page running at [http://localhost:6006](http://localhost:6006)

## CI

We are using [Github Actions](https://help.github.com/en/articles/about-github-actions).

### Useful commands

```sh
# force a deploy
$ now

# check all running instances
$ now ls

# check logs for a given instance
$ now logs hackerz.now.sh --all
```
