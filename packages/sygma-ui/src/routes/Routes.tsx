import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { NftTransferPage, TransferPage, TransferStatusPage } from "../pages";

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
      <Route path="/transfer_status" component={TransferStatusPage} />
      <Route exact path="/">
        <Redirect to={ROUTE_LINKS.Transfer} />
      </Route>
    </Switch>
  );
};

export default SygmaRoutes;
