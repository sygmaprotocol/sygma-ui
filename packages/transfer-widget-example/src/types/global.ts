import { SygmaConfig } from '@chainsafe/sygma-ui-core'

declare global {
  interface Window {
    ethereum: any;
    __RUNTIME_CONFIG__: {
      SYGMA: SygmaConfig
    }
  }
}
