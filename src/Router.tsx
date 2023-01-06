import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Coin from "./Routes/Coin";

function Router() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/pages/:page">
          <Home />
        </Route>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
