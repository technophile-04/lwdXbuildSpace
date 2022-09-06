import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[chain.polygon],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RPC }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: 'POK Viewer',
	chains,
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export const chainRB = chains;
