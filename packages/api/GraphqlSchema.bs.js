

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as FutureJs from "reason-future/src/FutureJs.bs.js";
import * as Belt_List from "bs-platform/lib/es6/belt_List.js";
import * as GraphqlFuture from "reason-graphql/src/variations/GraphqlFuture.bs.js";
import * as CamlinternalLazy from "bs-platform/lib/es6/camlinternalLazy.js";
import * as StoryData$Pennyworth from "./StoryData.bs.js";

var storyTypeLazy = Block.__(246, [(function (param) {
        return Curry._4(GraphqlFuture.Schema[/* obj */6], undefined, undefined, (function (param) {
                      return /* :: */[
                              Curry._6(GraphqlFuture.Schema[/* field */7], undefined, undefined, /* [] */0, (function (_ctx, story) {
                                      return story[/* id */2];
                                    }), "id", Curry._1(GraphqlFuture.Schema[/* nonnull */21], GraphqlFuture.Schema[/* int */17])),
                              /* :: */[
                                Curry._6(GraphqlFuture.Schema[/* field */7], undefined, undefined, /* [] */0, (function (_ctx, story) {
                                        return story[/* title */5];
                                      }), "title", Curry._1(GraphqlFuture.Schema[/* nonnull */21], GraphqlFuture.Schema[/* string */16])),
                                /* [] */0
                              ]
                            ];
                    }), "story");
      })]);

var tag = storyTypeLazy.tag | 0;

var storyType = tag === 250 ? storyTypeLazy[0] : (
    tag === 246 ? CamlinternalLazy.force_lazy_block(storyTypeLazy) : storyTypeLazy
  );

function handleJsPromiseError(prim) {
  return String(prim);
}

var query = Curry._1(GraphqlFuture.Schema[/* query */13], /* :: */[
      Curry._6(GraphqlFuture.Schema[/* async_field */8], undefined, undefined, /* :: */[
            Curry._3(GraphqlFuture.Schema[/* Arg */1][/* arg */0], undefined, "id", Curry._1(GraphqlFuture.Schema[/* Arg */1][/* nonnull */7], GraphqlFuture.Schema[/* Arg */1][/* int */3])),
            /* [] */0
          ], (function (_ctx, param, id) {
              return Curry._2(GraphqlFuture.Future[/* mapOk */10], FutureJs.fromPromise(StoryData$Pennyworth.getStory(id), handleJsPromiseError), (function (result) {
                            return result;
                          }));
            }), "story", storyType),
      /* :: */[
        Curry._6(GraphqlFuture.Schema[/* async_field */8], undefined, undefined, /* :: */[
              Curry._3(GraphqlFuture.Schema[/* Arg */1][/* arg */0], undefined, "page", Curry._1(GraphqlFuture.Schema[/* Arg */1][/* nonnull */7], GraphqlFuture.Schema[/* Arg */1][/* int */3])),
              /* [] */0
            ], (function (_ctx, param, page) {
                return Curry._2(GraphqlFuture.Future[/* mapOk */10], FutureJs.fromPromise(StoryData$Pennyworth.getTopStories(page), handleJsPromiseError), (function (result) {
                              return Belt_List.fromArray(result);
                            }));
              }), "topStories", Curry._1(GraphqlFuture.Schema[/* list */20], Curry._1(GraphqlFuture.Schema[/* nonnull */21], storyType))),
        /* [] */0
      ]
    ]);

var schema = Curry._2(GraphqlFuture.Schema[/* create */15], undefined, query);

export {
  storyTypeLazy ,
  storyType ,
  handleJsPromiseError ,
  query ,
  schema ,
  
}
/* storyType Not a pure module */
