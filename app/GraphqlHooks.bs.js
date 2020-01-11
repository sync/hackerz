

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as GraphqlHooks from "graphql-hooks";
import * as GraphqlHooksMemcache from "graphql-hooks-memcache";

var MemCache = { };

function createMemCache(initialState) {
  return GraphqlHooksMemcache.default(initialState);
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

function extractErrorMessage(clientRequestError) {
  if (clientRequestError !== undefined) {
    var match = clientRequestError;
    var match$1 = match.fetchError;
    if (match$1 !== undefined) {
      return match$1.message;
    } else {
      var match$2 = match.httpError;
      if (match$2 !== undefined) {
        return match$2.body;
      } else {
        var match$3 = match.graphQLErrors;
        if (match$3 !== undefined) {
          return Belt_Array.reduce(match$3, "", (function (currentMsg, error) {
                        return currentMsg + (", " + error.message);
                      }));
        } else {
          return ;
        }
      }
    }
  }
  
}

function useQuery(query) {
  var result = GraphqlHooks.useQuery(query.query);
  var match = result.loading;
  var match$1 = extractErrorMessage(result.error);
  var match$2 = result.data;
  if (match) {
    return /* Loading */0;
  } else if (match$1 !== undefined) {
    if (match$2 !== undefined) {
      return /* Error */Block.__(0, ["Something went wrong"]);
    } else {
      return /* Error */Block.__(0, [match$1]);
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
  extractErrorMessage ,
  useQuery ,
  
}
/* provider Not a pure module */
