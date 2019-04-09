module MemCache = {
  type t;

  [@bs.deriving abstract]
  type config = {initialState: Js.Json.t};

  type conf = Js.Json.t;

  [@bs.module "graphql-hooks-memcache"]
  external _createMemCache: config => t = "default";
};

let createMemCache = (~initialState) => {
  let config = MemCache.config(~initialState);
  MemCache._createMemCache(config);
};

module Client = {
  type t;

  [@bs.deriving abstract]
  type config = {
    url: string,
    cache: MemCache.t,
  };

  [@bs.module "graphql-hooks"] [@bs.new]
  external _createClient: config => t = "GraphQLClient";
};

let createClient = (~url: string, ~cache: MemCache.t) => {
  let config = Client.config(~url, ~cache);
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

[@bs.deriving abstract]
type error = {message: string};

[@bs.deriving abstract]
type httpError = {
  status: int,
  statusText: string,
  body: string,
};

[@bs.deriving abstract]
type clientRequestResult('any) = {
  loading: bool,
  cacheHit: bool,
  error: bool,
  data: 'any,
  fetchError: option(error),
  httpError: option(httpError),
};

type queryResponse('a) =
  | Loading
  | Error(string)
  | Data('a);

[@bs.module "graphql-hooks"]
external _useQuery: string => clientRequestResult('any) = "useQuery";

let useQuery = (~query) => {
  let result = _useQuery(query##query);
  switch (
    result->loadingGet,
    result->errorGet,
    result->dataGet,
    result->fetchErrorGet,
    result->httpErrorGet,
  ) {
  | (true, _, _, _, _) => Loading
  | (false, false, Some(response), _, _) => Data(response |> query##parse)
  | (false, true, None, Some(fetchError), None) =>
    Error(fetchError->messageGet)
  | (false, true, None, None, Some(httpError)) => Error(httpError->bodyGet)
  | _ => Error("Something went wrong")
  };
};
