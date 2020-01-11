

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as FutureJs from "reason-future/src/FutureJs.bs.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as GraphqlFuture from "reason-graphql/src/variations/GraphqlFuture.bs.js";
import * as CamlinternalLazy from "bs-platform/lib/es6/camlinternalLazy.js";
import * as StoryData$Hackerz from "./StoryData.bs.js";

var storyTypeLazy = Caml_obj.caml_lazy_make((function (param) {
        return Curry._4(GraphqlFuture.Schema.obj, undefined, undefined, (function (param) {
                      return /* :: */[
                              Curry._6(GraphqlFuture.Schema.field, undefined, undefined, /* [] */0, (function (_ctx, story) {
                                      return story[/* id */2];
                                    }), "id", Curry._1(GraphqlFuture.Schema.nonnull, GraphqlFuture.Schema.$$int)),
                              /* :: */[
                                Curry._6(GraphqlFuture.Schema.field, undefined, undefined, /* [] */0, (function (_ctx, story) {
                                        return story[/* title */5];
                                      }), "title", Curry._1(GraphqlFuture.Schema.nonnull, GraphqlFuture.Schema.string)),
                                /* [] */0
                              ]
                            ];
                    }), "story");
      }));

var storyType = CamlinternalLazy.force(storyTypeLazy);

function handleJsPromiseError(prim) {
  return String(prim);
}

var query = Curry._1(GraphqlFuture.Schema.query, /* :: */[
      Curry._6(GraphqlFuture.Schema.async_field, undefined, undefined, /* :: */[
            Curry._3(GraphqlFuture.Schema.Arg.arg, undefined, "id", Curry._1(GraphqlFuture.Schema.Arg.nonnull, GraphqlFuture.Schema.Arg.$$int)),
            /* [] */0
          ], (function (_ctx, param, id) {
              return Curry._2(GraphqlFuture.Future.mapOk, FutureJs.fromPromise(StoryData$Hackerz.getStory(id), handleJsPromiseError), (function (result) {
                            return result;
                          }));
            }), "story", storyType),
      /* :: */[
        Curry._6(GraphqlFuture.Schema.async_field, undefined, undefined, /* :: */[
              Curry._3(GraphqlFuture.Schema.Arg.arg, undefined, "page", Curry._1(GraphqlFuture.Schema.Arg.nonnull, GraphqlFuture.Schema.Arg.$$int)),
              /* [] */0
            ], (function (_ctx, param, page) {
                return Curry._2(GraphqlFuture.Future.mapOk, FutureJs.fromPromise(StoryData$Hackerz.getTopStories(page), handleJsPromiseError), (function (result) {
                              return Belt_List.fromArray(result);
                            }));
              }), "topStories", Curry._1(GraphqlFuture.Schema.list, Curry._1(GraphqlFuture.Schema.nonnull, storyType))),
        /* [] */0
      ]
    ]);

var schema = Curry._2(GraphqlFuture.Schema.create, undefined, query);

export {
  storyTypeLazy ,
  storyType ,
  handleJsPromiseError ,
  query ,
  schema ,
  
}
/* storyType Not a pure module */
