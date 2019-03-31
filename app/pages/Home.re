[@bs.config {jsx: 3}];

type css = {. "foo": string};
[@bs.module] external css: css = "./Home.css";

let ste = ReasonReact.string;

module TopStoriesQuery = [%graphql
  {|
{
  topStories(page: 0) {
    id
    title
  }
}
|}
];

let query = TopStoriesQuery.make();

[@react.component]
let make = () => {
  let result = GraphqlHooks.useQuery(~query);

  let queryResult =
    switch (result) {
    | Loading => <div> {ste("Loading")} </div>
    | Error(message) => <div> {ste(message)} </div>
    | Data(response) =>
      switch (response##topStories) {
      | Some(stories) =>
        <ul>
          {stories
           |> Array.map(story =>
                <li key={story##id |> string_of_int}>
                  {story##title |> ste}
                </li>
              )
           |> ReasonReact.array}
        </ul>
      | _ => "No stories found" |> ste
      }
    };

  <>
    <div className={css##foo}> {"HELLO" |> ste} </div>
    queryResult
    <Link href="/more"> {"See some more" |> ste} </Link>
  </>;
};
