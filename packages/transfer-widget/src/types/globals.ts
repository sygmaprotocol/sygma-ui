import { SygmaConfig, UIConfig } from "@chainsafe/sygma-ui-core";
declare global {
  interface Window {
    ethereum: any;
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      SYGMA: SygmaConfig;
      INDEXER_URL: string;
      UI_EXPLORER_URL: string;
    };
  }
}
export {};
