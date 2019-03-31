%raw
"require('isomorphic-fetch')";

let apiBaseUrl = "https://hacker-news.firebaseio.com";

let topStoriesUrl = () => {j|$apiBaseUrl/v0/topstories.json|j};

let storyUrl = id => {j|$apiBaseUrl/v0/item/$id.json|j};

type story = {
  by: string,
  descendants: int,
  id: int,
  score: int,
  time: int,
  title: string,
  url: option(string),
};

type topstories = array(story);

module Decode = {
  let idsArray = (json): array(int) => Json.Decode.(json |> array(int));
  let story = (json): story =>
    Json.Decode.{
      by: json |> field("by", string),
      descendants: json |> field("descendants", int),
      id: json |> field("id", int),
      score: json |> field("score", int),
      time: json |> field("time", int),
      title: json |> field("title", string),
      url: json |> optional(field("url", string)),
    };
  let stories = (json): array(story) => Json.Decode.(json |> array(story));
};

let getStory = id =>
  Js.Promise.(
    Fetch.fetch(storyUrl(id))
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Decode.story |> resolve)
  );

let perPage = 25;

let sliced = (array, ~page: int) =>
  array |> Belt.Array.slice(~offset=page * perPage, ~len=perPage);

let getStoriesForIds = ids => {
  Js.Promise.(
    ids
    |> Array.map(getStory)
    |> Js.Promise.all
    |> Js.Promise.then_(res => res |> resolve)
  );
};

let getTopStories = page => {
  Js.Promise.(
    Fetch.fetch(topStoriesUrl())
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Decode.idsArray |> sliced(~page) |> resolve)
    |> then_(getStoriesForIds)
  );
};
