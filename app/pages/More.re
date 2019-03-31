[@bs.config {jsx: 3}];

type css = {. "foo": string};
[@bs.module] external css: css = "./More.css";

[@react.component]
let make = () => {
  <> <div className={css##foo}> {ReasonReact.string("More")} </div> </>;
};
