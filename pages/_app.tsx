import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import '@rainbow-me/rainbowkit/styles.css';
import { chain, WagmiConfig } from 'wagmi';
import { chainRB, wagmiClient } from '../utils';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const [showChild, setShowChild] = useState(false);
	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	// used for rainbowKit hydration problem
	if (typeof window === 'undefined') {
		return <></>;
	} else {
		return (
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chainRB} coolMode>
					<Component {...pageProps} />
					<Toaster />
				</RainbowKitProvider>
			</WagmiConfig>
		);
	}
}

export default MyApp;
