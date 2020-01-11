

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as GraphqlHooks from "graphql-hooks";
import * as GraphqlHooksMemcache from "graphql-hooks-memcache";

var MemCache = { };

function createMemCache(initialState) {
  return GraphqlHooksMemcache.default({
              initialState: initialState
            });
}

var Client = { };

function createClient(url, cache) {
  return new GraphqlHooks.GraphQLClient({
              url: url,
              cache: cache
            });
}

var provider = GraphqlHooks.ClientContext.Provider;

var Provider = {
  provider: provider
};

function useQuery(query) {
  var result = GraphqlHooks.useQuery(query.query);
  var match = result.loading;
  var match$1 = result.error;
  var match$2 = result.data;
  var match$3 = result.fetchError;
  var match$4 = result.httpError;
  if (match) {
    return /* Loading */0;
  } else if (match$1) {
    if (match$2 !== undefined) {
      return /* Error */Block.__(0, ["Something went wrong"]);
    } else if (match$3 !== undefined) {
      if (match$4 !== undefined) {
        return /* Error */Block.__(0, ["Something went wrong"]);
      } else {
        return /* Error */Block.__(0, [Caml_option.valFromOption(match$3).message]);
      }
    } else if (match$4 !== undefined) {
      return /* Error */Block.__(0, [Caml_option.valFromOption(match$4).body]);
    } else {
      return /* Error */Block.__(0, ["Something went wrong"]);
    }
  } else if (match$2 !== undefined) {
    return /* Data */Block.__(1, [Curry._1(query.parse, Caml_option.valFromOption(match$2))]);
  } else {
    return /* Error */Block.__(0, ["Something went wrong"]);
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
