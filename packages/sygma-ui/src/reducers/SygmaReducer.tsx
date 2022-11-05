import {
  BridgeData,
  BridgeEvents,
  Sygma,
  FeeOracleData,
} from "@buildwithsygma/sygma-sdk-core";
import { providers } from "ethers";

export type SygmaState = {
  sygmaInstance: Sygma | undefined;
};

export type SygmaReducerAction =
  | {
      type: "setInstanceAndData";
      payload: {
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
      const { sygmaInstance } = action.payload;
      return {
        ...state,
        sygmaInstance: sygmaInstance,
      };
    }
    default:
      return state;
  }
};
