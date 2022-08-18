import { SygmaConfig, UIConfig } from "../sygmaConfig";

declare global {
  interface Window {
    ethereum: any;
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      SYGMA: SygmaConfig;
      INDEXER_URL: string;
    };
  }
}
