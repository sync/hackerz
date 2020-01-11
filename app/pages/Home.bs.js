

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as HomeCss from "./Home.css";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Link$Hackerz from "../components/Link.bs.js";
import * as GraphqlHooks$Hackerz from "../GraphqlHooks.bs.js";

var css = HomeCss;

function ste(prim) {
  return prim;
}

var ppx_printed_query = "query   {\ntopStories(page: 0)  {\nid  \ntitle  \n}\n\n}\n";

function parse(value) {
  var match = Js_json.decodeObject(value);
  if (match !== undefined) {
    var match$1 = Js_dict.get(Caml_option.valFromOption(match), "topStories");
    var tmp;
    if (match$1 !== undefined) {
      var value$1 = Caml_option.valFromOption(match$1);
      var match$2 = Js_json.decodeNull(value$1);
      if (match$2 !== undefined) {
        tmp = undefined;
      } else {
        var match$3 = Js_json.decodeArray(value$1);
        tmp = match$3 !== undefined ? match$3.map((function (value) {
                  var match = Js_json.decodeObject(value);
                  if (match !== undefined) {
                    var value$1 = Caml_option.valFromOption(match);
                    var match$1 = Js_dict.get(value$1, "id");
                    var tmp;
                    if (match$1 !== undefined) {
                      var value$2 = Caml_option.valFromOption(match$1);
                      var match$2 = Js_json.decodeNumber(value$2);
                      tmp = match$2 !== undefined ? match$2 | 0 : Js_exn.raiseError("graphql_ppx: Expected int, got " + JSON.stringify(value$2));
                    } else {
                      tmp = Js_exn.raiseError("graphql_ppx: Field id on type story is missing");
                    }
                    var match$3 = Js_dict.get(value$1, "title");
                    var tmp$1;
                    if (match$3 !== undefined) {
                      var value$3 = Caml_option.valFromOption(match$3);
                      var match$4 = Js_json.decodeString(value$3);
                      tmp$1 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                    } else {
                      tmp$1 = Js_exn.raiseError("graphql_ppx: Field title on type story is missing");
                    }
                    return {
                            id: tmp,
                            title: tmp$1
                          };
                  } else {
                    return Js_exn.raiseError("graphql_ppx: Object is not a value");
                  }
                })) : Js_exn.raiseError("graphql_ppx: Expected array, got " + JSON.stringify(value$1));
      }
    } else {
      tmp = undefined;
    }
    return {
            topStories: tmp
          };
  } else {
    return Js_exn.raiseError("graphql_ppx: Object is not a value");
  }
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var TopStoriesQuery = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

var query = make(/* () */0);

function Home(Props) {
  var result = GraphqlHooks$Hackerz.useQuery(query);
  var queryResult;
  if (typeof result === "number") {
    queryResult = React.createElement("div", undefined, "Loading");
  } else if (result.tag) {
    var match = result[0].topStories;
    queryResult = match !== undefined ? React.createElement("ul", undefined, $$Array.map((function (story) {
                  return React.createElement("li", {
                              key: String(story.id)
                            }, story.title);
                }), match)) : "No stories found";
  } else {
    queryResult = React.createElement("div", undefined, result[0]);
  }
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: css.foo
                }, "HELLO"), queryResult, React.createElement(Link$Hackerz.make, {
                  href: "/more",
                  children: "See some more"
                }));
}

var make$1 = Home;

export {
  css ,
  ste ,
  TopStoriesQuery ,
  query ,
  make$1 as make,
  
}
/* css Not a pure module */
