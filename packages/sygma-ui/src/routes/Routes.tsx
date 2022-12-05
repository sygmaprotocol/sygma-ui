import React, { useEffect } from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";

import { NftTransferPage, TransferPage } from "../pages";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  NftTransfer: "/nft_transfer",
};

interface ISygmaRoutes {
  wrapTokenPage?: boolean;
}

const SygmaRoutes: React.FC<ISygmaRoutes> = ({ wrapTokenPage }) => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Transfer} component={TransferPage} />
      {wrapTokenPage && (
        <Route
          exact
          path={ROUTE_LINKS.NftTransfer}
          component={NftTransferPage}
        />
      )}
      <Route exact path="/">
        <Redirect to={ROUTE_LINKS.Transfer} />
      </Route>
    </Switch>
  );
};

export default SygmaRoutes;
