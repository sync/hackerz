[@bs.module "./registerServiceWorker"]
external registerServiceWorker: unit => unit = "register";

registerServiceWorker();

[@bs.val] [@bs.scope "window"]
external initialState: GraphqlHooks.MemCache.config = "__INITIAL_STATE__";

let url = "/api/graphql";
let cache = GraphqlHooks.createMemCache(~initialState);
let client = GraphqlHooks.createClient(~url, ~cache);

let app = <App client />;

ReactDOMRe.hydrateToElementWithId(app, "app");
