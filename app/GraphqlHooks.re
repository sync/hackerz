module MemCache = {
  type t;

  type config = {initialState: Js.Json.t};

  type conf = Js.Json.t;

  [@bs.module "graphql-hooks-memcache"]
  external _createMemCache: config => t = "default";
};

let createMemCache = (~initialState) => {
  let config = {
    initialState;
  };
  MemCache._createMemCache(config);
};

module Client = {
  type t;

  type config = {
    url: string,
    cache: MemCache.t,
  };

  [@bs.module "graphql-hooks"] [@bs.new]
  external _createClient: config => t = "GraphQLClient";
};

let createClient = (~url: string, ~cache: MemCache.t) => {
  open Client;
  let config = {url, cache};
  Client._createClient(config);
};

[@bs.val] [@bs.module "graphql-hooks"]
external context: React.Context.t(Client.t) = "ClientContext";

module Provider = {
  let provider = React.Context.provider(context);

  [@react.component] [@bs.module "graphql-hooks"] [@bs.scope "ClientContext"]
  external make: (~value: Client.t, ~children: React.element) => React.element =
    "Provider";
};

type error = {message: string};

type httpError = {
  status: int,
  statusText: string,
  body: string,
};

type clientRequestError = {
  fetchError: option(error),
  httpError: option(httpError),
  graphQLErrors: option(array(error)),
};

type clientRequestResult('any) = {
  loading: bool,
  cacheHit: bool,
  error: option(clientRequestError),
  data: 'any,
};

type queryResponse('a) =
  | Loading
  | Error(string)
  | Data('a);

[@bs.module "graphql-hooks"]
external _useQuery: string => clientRequestResult('any) = "useQuery";

let extractErrorMessage = (~clientRequestError) => {
  switch (clientRequestError) {
  | Some({fetchError: Some(fetchError), _}) => Some(fetchError.message)
  | Some({httpError: Some(httpError), _}) => Some(httpError.body)
  | Some({graphQLErrors: Some(graphQLErrors), _}) =>
    graphQLErrors
    ->Belt.Array.reduce("", (currentMsg, error) =>
        currentMsg ++ ", " ++ error.message
      )
    ->Some
  | _ => None
  };
};

let useQuery = (~query) => {
  let result = _useQuery(query##query);
  switch (
    result.loading,
    extractErrorMessage(~clientRequestError=result.error),
    result.data,
  ) {
  | (true, _, _) => Loading
  | (false, None, Some(response)) => Data(response |> query##parse)
  | (false, Some(message), None) => Error(message)
  | _ => Error("Something went wrong")
  };
};
