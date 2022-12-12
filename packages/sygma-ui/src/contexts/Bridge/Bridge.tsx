import React, { createContext, useContext, useEffect, useReducer } from "react";
import { BridgeConfig, sygmaConfig, ChainType } from "../../sygmaConfig";
import { useWeb3 } from "../localWeb3Context";
import {
  BridgeData,
  Sygma,
  SygmaBridgeSetupList,
} from "@buildwithsygma/sygma-sdk-core";
import { sygmaReducer, SygmaState } from "../../reducers";

interface IBridgeContext {
  children: React.ReactNode | React.ReactNode[];
}

type BridgeContext = SygmaState;

const BridgeContext = createContext<BridgeContext | undefined>(undefined);

const BridgeProvider = ({ children }: IBridgeContext) => {
  const { homeChains, ...rest } = useWeb3();
  const initState: SygmaState = {
    sygmaInstance: undefined,
  };
  const [bridgeState, bridgeDispatcher] = useReducer(sygmaReducer, initState);

  useEffect(() => {
    if (homeChains.length) {
      const web3provider = rest.provider;

      const { feeOracleSetup } = sygmaConfig();
      let isMounted = true;
      const sygmaInstance = new Sygma({
        feeOracleSetup,
        bridgeSetupList: homeChains as any,
      });
      sygmaInstance
        .initializeConnectionFromWeb3Provider(web3provider?.provider)

        .then((res) => {
          if (
            isMounted &&
            rest.destinationChainConfig &&
            rest.destinationChainConfig.domainId
          ) {
            bridgeDispatcher({
              type: "setInstanceAndData",
              payload: {
                feeOracleSetup,
                sygmaInstance: res.setDestination(
                  rest.destinationChainConfig.domainId.toString()
                ),
              },
            });
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [homeChains, rest.destinationChainConfig]);

  return (
    <BridgeContext.Provider value={bridgeState}>
      {children}
    </BridgeContext.Provider>
  );
};

const useBridge = () => {
  const context = useContext(BridgeContext);
  if (context === undefined) {
    throw new Error("useBridge must be called within a BridgeProvider");
  }

  return context;
};

export { BridgeProvider, useBridge };
