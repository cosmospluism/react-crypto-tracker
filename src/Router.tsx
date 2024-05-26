import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path={"/:id"}>
          <Coin />
        </Route>
        <Route path={"/"}>
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
