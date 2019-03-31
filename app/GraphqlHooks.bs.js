

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as GraphqlHooks from "graphql-hooks";
import * as GraphqlHooksMemcache from "graphql-hooks-memcache";

var MemCache = /* module */[];

function createMemCache(initialState) {
  return GraphqlHooksMemcache.default({
              initialState: initialState
            });
}

var Client = /* module */[];

function createClient(url, cache) {
  return new GraphqlHooks.GraphQLClient({
              url: url,
              cache: cache
            });
}

var provider = GraphqlHooks.ClientContext.Provider;

var Provider = /* module */[/* provider */provider];

function useQuery(query) {
  var result = GraphqlHooks.useQuery(query.query);
  var match = result.loading;
  var match$1 = result.error;
  var match$2 = result.data;
  if (match) {
    return /* Loading */0;
  } else if (match$1 || match$2 === undefined) {
    return /* Error */Block.__(0, ["something is wrong"]);
  } else {
    return /* Data */Block.__(1, [Curry._1(query.parse, Caml_option.valFromOption(match$2))]);
  }
}

export {
  MemCache ,
  createMemCache ,
  Client ,
  createClient ,
  Provider ,
  useQuery ,
  
}
/* provider Not a pure module */
