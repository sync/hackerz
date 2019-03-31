

import * as React from "react";
import * as ReactDOMRe from "reason-react/src/ReactDOMRe.js";
import * as App$Hackerz from "./App.bs.js";
import * as GraphqlHooks$Hackerz from "./GraphqlHooks.bs.js";
import * as RegisterServiceWorker from "./registerServiceWorker";

function registerServiceWorker(prim) {
  RegisterServiceWorker.register();
  return /* () */0;
}

RegisterServiceWorker.register();

var url = "/api/graphql";

var cache = GraphqlHooks$Hackerz.createMemCache(window.__INITIAL_STATE__);

var client = GraphqlHooks$Hackerz.createClient(url, cache);

var app = React.createElement(App$Hackerz.make, {
      client: client
    });

ReactDOMRe.hydrateToElementWithId(app, "app");

export {
  registerServiceWorker ,
  url ,
  cache ,
  client ,
  app ,
  
}
/*  Not a pure module */
