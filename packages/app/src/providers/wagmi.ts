import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { SITE_NAME } from "../utils/config";
import { ethers } from "ethers";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    (chain: Chain) => ({
      chain,
      provider: () => {
        return new ethers.providers.StaticJsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL!,
          polygonMumbai.id
        );
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };
