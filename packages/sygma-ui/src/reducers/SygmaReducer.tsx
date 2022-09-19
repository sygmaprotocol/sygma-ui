import {
  BridgeData,
  BridgeEvents,
  Sygma,
  FeeOracleData,
} from "@chainsafe/sygma-sdk-core";
import { providers } from "ethers";

export type SygmaState = {
  sygmaInstance: Sygma | undefined;
  bridgeSetup: BridgeData | undefined;
};

export type SygmaReducerAction =
  | {
      type: "setInstanceAndData";
      payload: {
        bridgeSetup: BridgeData;
        feeOracleSetup: FeeOracleData;
        sygmaInstance: Sygma;
      };
    }
  | {
      type: "setAll";
      payload: {
        provider: providers.Web3Provider;
        isActive: boolean;
        chainId: number;
        accounts: any;
        address: string;
      };
    };

export const sygmaReducer = (state: SygmaState, action: SygmaReducerAction) => {
  switch (action.type) {
    case "setInstanceAndData": {
      const { bridgeSetup, sygmaInstance } = action.payload;
      return {
        ...state,
        sygmaInstance: sygmaInstance,
        bridgeSetup: bridgeSetup,
      };
    }
    default:
      return state;
  }
};
