import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Coin from "./Routes/Coin";

function Router() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default Router;
