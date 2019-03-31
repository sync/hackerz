[@bs.config {jsx: 3}];

[@bs.val] external browser: bool = "process.browser";

if (!browser) {
  %raw
  "require('isomorphic-fetch')";
};

type route =
  | Home
  | More;

let mapPathToRoute = (path: list(string)) =>
  switch (path) {
  | [] => Home
  | ["more"] => More
  | _ => Home
  };

[@react.component]
let make = (~client, ~serverPath=?) => {
  let url =
    switch (serverPath) {
    | Some(path) =>
      ReasonReactRouter.useUrl(
        ~serverUrl={path: [path], hash: "", search: ""},
        (),
      )
    | None => ReasonReactRouter.useUrl()
    };

  <div>
    <GraphqlHooks.Provider value=client>
      <main>
        {switch (url.path |> mapPathToRoute) {
         | Home => <Home />
         | More => <More />
         }}
      </main>
    </GraphqlHooks.Provider>
  </div>;
};
