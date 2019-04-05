

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as Caml_int32 from "bs-platform/lib/es6/caml_int32.js";
import * as Json_decode from "@glennsl/bs-json/src/Json_decode.bs.js";

require('isomorphic-fetch')
;

var apiBaseUrl = "https://hacker-news.firebaseio.com";

function topStoriesUrl(param) {
  return "" + (String(apiBaseUrl) + "/v0/topstories.json");
}

function storyUrl(id) {
  return "" + (String(apiBaseUrl) + ("/v0/item/" + (String(id) + ".json")));
}

function idsArray(json) {
  return Json_decode.array(Json_decode.$$int, json);
}

function story(json) {
  return /* record */[
          /* by */Json_decode.field("by", Json_decode.string, json),
          /* descendants */Json_decode.optional((function (param) {
                  return Json_decode.field("descendants", Json_decode.$$int, param);
                }), json),
          /* id */Json_decode.field("id", Json_decode.$$int, json),
          /* score */Json_decode.field("score", Json_decode.$$int, json),
          /* time */Json_decode.field("time", Json_decode.$$int, json),
          /* title */Json_decode.field("title", Json_decode.string, json),
          /* url */Json_decode.optional((function (param) {
                  return Json_decode.field("url", Json_decode.string, param);
                }), json)
        ];
}

function stories(json) {
  return Json_decode.array(story, json);
}

var Decode = /* module */[
  /* idsArray */idsArray,
  /* story */story,
  /* stories */stories
];

function getStory(id) {
  return fetch(storyUrl(id)).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                return Promise.resolve(story(json));
              }));
}

function sliced(array, page) {
  var arg = Caml_int32.imul(page, 25);
  return (function (param) {
              return Belt_Array.slice(param, arg, 25);
            })(array);
}

function getStoriesForIds(ids) {
  return Promise.all($$Array.map(getStory, ids)).then((function (res) {
                return Promise.resolve(res);
              }));
}

function getTopStories(page) {
  return fetch(topStoriesUrl(/* () */0)).then((function (prim) {
                    return prim.json();
                  })).then((function (json) {
                  return Promise.resolve(sliced(Json_decode.array(Json_decode.$$int, json), page));
                })).then(getStoriesForIds);
}

var perPage = 25;

export {
  apiBaseUrl ,
  topStoriesUrl ,
  storyUrl ,
  Decode ,
  getStory ,
  perPage ,
  sliced ,
  getStoriesForIds ,
  getTopStories ,
  
}
/*  Not a pure module */
