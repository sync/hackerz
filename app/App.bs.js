

import * as React from "react";
import * as Home$Hackerz from "./pages/Home.bs.js";
import * as More$Hackerz from "./pages/More.bs.js";
import * as GraphqlHooks from "graphql-hooks";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.js";

if (!process.browser) {
  ((require('isomorphic-fetch')));
}

function mapPathToRoute(path) {
  if (path && path[0] === "more" && !path[1]) {
    return /* More */1;
  } else {
    return /* Home */0;
  }
}

function App(Props) {
  var client = Props.client;
  var serverPath = Props.serverPath;
  var url = serverPath !== undefined ? ReasonReactRouter.useUrl({
          path: /* :: */[
            serverPath,
            /* [] */0
          ],
          hash: "",
          search: ""
        }, /* () */0) : ReasonReactRouter.useUrl(undefined, /* () */0);
  var match = mapPathToRoute(url.path);
  return React.createElement("div", undefined, React.createElement(GraphqlHooks.ClientContext.Provider, {
                  value: client,
                  children: React.createElement("main", undefined, match ? React.createElement(More$Hackerz.make, { }) : React.createElement(Home$Hackerz.make, { }))
                }));
}

var make = App;

export {
  mapPathToRoute ,
  make ,
  
}
/*  Not a pure module */
