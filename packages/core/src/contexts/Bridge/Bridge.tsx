import React, { createContext, useContext, useEffect, useReducer } from "react";
import { BridgeConfig, sygmaConfig, ChainType } from "../../sygmaConfig";
import { useWeb3 } from "../localWeb3Context";
import {
  BridgeData,
  Sygma,
  SygmaBridgeSetupList,
} from "@chainsafe/sygma-sdk-core";
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
    bridgeSetup: undefined,
  };
  const [bridgeState, bridgeDispatcher] = useReducer(sygmaReducer, initState);

  useEffect(() => {
    if (homeChains.length) {
      const web3provider = rest.provider;

      const bridgeSetup: BridgeData = homeChains.reduce((acc, chain, idx) => {
        const {
          bridgeAddress,
          erc20HandlerAddress,
          tokens,
          rpcUrl,
          domainId,
          decimals,
          feeSettings,
          name,
          networkId,
        } = chain;

        // NOTE: ASUMPTION HERE IS THAT WE HAVE ONLY ONE TOKEN
        const [{ address, resourceId }] = tokens;

        acc = {
          ...acc,
          [`chain${idx + 1}`]: {
            bridgeAddress,
            erc20Address: address,
            erc20HandlerAddress,
            rpcURL: rpcUrl,
            domainId,
            erc20ResourceID: resourceId,
            decimals,
            feeSettings,
            name,
            networkId,
          },
        };

        return acc;
      }, {} as BridgeData);

      const { feeOracleSetup } = sygmaConfig();
      let isMounted = true;
      const sygmaInstance = new Sygma({ bridgeSetup, feeOracleSetup });
      sygmaInstance
        .initializeConnectionFromWeb3Provider(web3provider?.provider)
        .then((res) => {
          if (isMounted) {
            bridgeDispatcher({
              type: "setInstanceAndData",
              payload: {
                bridgeSetup,
                feeOracleSetup,
                sygmaInstance: res,
              },
            });
          }
        });
      return () => {
        isMounted = false;
      };
    }
  }, [homeChains]);

  return (
    <BridgeContext.Provider value={{ ...bridgeState }}>
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
