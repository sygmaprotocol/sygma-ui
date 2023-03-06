import { useState } from "react";

export function useSetBridgeSettingsHook() {
  const [bridgeFee] = useState<number | undefined>();
  const [relayerThreshold] = useState<number | undefined>(undefined);

  return [bridgeFee, relayerThreshold];
}
