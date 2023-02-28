import { Bridge } from "@chainsafe/chainbridge-contracts";
import { useState } from "react";

export function useSetBridgeSettingsHook(homeBridge?: Bridge) {
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );

  return [bridgeFee, relayerThreshold];
}
