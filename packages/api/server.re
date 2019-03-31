open Graphql.Language;
open GraphqlFuture;

let schema = GraphqlSchema.schema;

type express;
[@bs.module "express"] external express: unit => express = "default";

type response;
[@bs.send] external send: (response, string) => unit = "";
[@bs.send] external sendJSON: (response, Js.Json.t) => unit = "send";

type request;
type handler = (request, response) => unit;
[@bs.send] external use: (express, handler) => unit = "";
[@bs.send] external get: (express, string, handler) => unit = "";
[@bs.send] external post: (express, string, handler) => unit = "";

[@bs.get] [@bs.return null_undefined_to_opt]
external bodyJSON: request => option(Js.Json.t) = "body";

let app = express();

module BodyParser = {
  [@bs.val] [@bs.module "body-parser"] external json: unit => handler = "json";
};

use(app, BodyParser.json());

let getQueryString = json =>
  json
  ->Belt.Option.flatMap(json => Js.Json.decodeObject(json))
  ->Belt.Option.flatMap(dict => Js.Dict.get(dict, "query"))
  ->Belt.Option.flatMap(json => Js.Json.decodeString(json));

let executeGraphqlQuery = query =>
  Schema.execute(
    schema,
    ~document=Parser.parse(query)->Belt.Result.getExn,
    ~ctx=(),
  )
  ->Schema.resultToJson;

let graphqlHandler = (req, res) => {
  let queryString = req->bodyJSON->getQueryString;

  switch (queryString) {
  | Some(query) =>
    query
    ->executeGraphqlQuery
    ->Schema.Io.map(jsonResult => sendJSON(res, jsonResult))
    ->ignore
  | _ => send(res, "unable to parse query")
  };
};

get(app, "*", graphqlHandler);
post(app, "*", graphqlHandler);

let default = app;
