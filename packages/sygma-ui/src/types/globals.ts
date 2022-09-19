import { SygmaConfig, UIConfig } from "../sygmaConfig";
interface EthereumProvider {
  isMetaMask?: boolean;
}
declare global {
  interface Window {
    ethereum?: EthereumProvider;
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      SYGMA: SygmaConfig;
      INDEXER_URL: string;
      UI_EXPLORER_URL: string;
    };
  }
}
