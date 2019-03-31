[@bs.config {jsx: 3}];

let handleClick = (href, event) =>
  if (!ReactEvent.Mouse.defaultPrevented(event)) {
    ReactEvent.Mouse.preventDefault(event);
    ReasonReact.Router.push(href);
  };

[@react.component]
let make = (~href, ~children, ()) => {
  <a href onClick={handleClick(href)}> children </a>;
};
