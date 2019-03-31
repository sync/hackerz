

import * as React from "react";
import * as MoreCss from "./More.css";

var css = MoreCss;

function More(Props) {
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: css.foo
                }, "More"));
}

var make = More;

export {
  css ,
  make ,
  
}
/* css Not a pure module */
