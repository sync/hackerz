

import * as React from "react";
import * as ReasonReact from "reason-react/src/ReasonReact.js";
import * as ReasonReactRouter from "reason-react/src/ReasonReactRouter.js";

function handleClick(href, $$event) {
  if ($$event.defaultPrevented) {
    return 0;
  } else {
    $$event.preventDefault();
    return ReasonReactRouter.push(href);
  }
}

function Link(Props) {
  var href = Props.href;
  var children = Props.children;
  return React.createElement("a", {
              href: href,
              onClick: (function (param) {
                  return handleClick(href, param);
                })
            }, children);
}

var make = Link;

export {
  handleClick ,
  make ,
  
}
/* react Not a pure module */
