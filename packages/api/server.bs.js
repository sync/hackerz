

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Express from "express";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Belt_Result from "bs-platform/lib/es6/belt_Result.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as BodyParser from "body-parser";
import * as GraphqlFuture from "reason-graphql/src/variations/GraphqlFuture.bs.js";
import * as Graphql_Language_Parser from "reason-graphql/src/language/Graphql_Language_Parser.bs.js";
import * as GraphqlSchema$Pennyworth from "./GraphqlSchema.bs.js";

var app = Express.default();

var BodyParser$1 = /* module */[];

app.use(BodyParser.json());

function getQueryString(json) {
  return Belt_Option.flatMap(Belt_Option.flatMap(Belt_Option.flatMap(json, Js_json.decodeObject), (function (dict) {
                    return Js_dict.get(dict, "query");
                  })), Js_json.decodeString);
}

function executeGraphqlQuery(query) {
  return Curry._1(GraphqlFuture.Schema[/* resultToJson */45], Curry._4(GraphqlFuture.Schema[/* execute */44], undefined, Belt_Result.getExn(Graphql_Language_Parser.parse(query)), GraphqlSchema$Pennyworth.schema, /* () */0));
}

function graphqlHandler(req, res) {
  var queryString = getQueryString(Caml_option.nullable_to_opt(req.body));
  if (queryString !== undefined) {
    Curry._2(GraphqlFuture.Schema[/* Io */0][/* map */4], executeGraphqlQuery(queryString), (function (jsonResult) {
            res.send(jsonResult);
            return /* () */0;
          }));
    return /* () */0;
  } else {
    res.send("unable to parse query");
    return /* () */0;
  }
}

app.get("*", graphqlHandler);

app.post("*", graphqlHandler);

var schema = GraphqlSchema$Pennyworth.schema;

var $$default = app;

export {
  schema ,
  app ,
  BodyParser$1 as BodyParser,
  getQueryString ,
  executeGraphqlQuery ,
  graphqlHandler ,
  $$default ,
  $$default as default,
  
}
/* app Not a pure module */
