import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

export const useWallet = () => {
	const [currentAccount, setCurrentAccount] = useState<
		string | undefined | null
	>('');
	const POLYGON_RPC_URL = 'https://polygon-rpc.com';
	const [isCorrectNetwork, setIsCorrectNetwork] = useState<Boolean>(false);

	// --------------------------------------------------
	// Change network
	// --------------------------------------------------
	const changeNetwork = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: ethers.utils.hexValue(137) }],
				});
			} catch (error: any) {
				if (error.code === 4902) {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainName: 'Polygon',
								chainId: ethers.utils.hexValue(137),
								nativeCurrency: {
									name: 'MATIC',
									decimals: 18,
									symbol: 'MATIC',
								},
								rpcUrls: [POLYGON_RPC_URL],
							},
						],
					});
				} else {
					toast.error('Please switch to Mumbai testnet');
					console.error(error);
				}
			}
		}
	};

	// --------------------------------------------------
	// Ask to connect metamask
	// --------------------------------------------------
	const connectWallet = async () => {
		const ethereum = window.ethereum!;
		try {
			if (!ethereum) {
				toast.error('You dont have metamask wallet installed');
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			await changeNetwork();

			if (accounts && Array.isArray(accounts)) {
				if (accounts.length > 0) {
					setCurrentAccount(accounts[0]);
					console.log(accounts);
				} else {
					console.log('No accounts found');
				}
			} else {
				console.log('No accounts found');
			}
		} catch (error: any) {
			toast.error(error.message);
			console.log(error);
			throw new Error(error.message);
		}
	};

	// --------------------------------------------------
	// Check if user have already connected to site
	// --------------------------------------------------
	const checkIfWalletIsConnected = async () => {
		const ethereum = window.ethereum!;
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts && Array.isArray(accounts)) {
				if (accounts.length > 0) {
					setCurrentAccount(accounts[0]);
					console.log(accounts);
				} else {
					toast.error('No accounts found');
				}
			} else {
				toast.error('No accounts found');
			}
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		const ethereum = window.ethereum;
		if (ethereum) {
			const getChain = async () => {
				// @ts-ignore
				const provider = new ethers.providers.Web3Provider(ethereum);
				const { chainId } = await provider.getNetwork();
				console.log('CHAIN ID : ', chainId);
				setIsCorrectNetwork(chainId === 137);
			};

			ethereum.on('accountsChanged', (...accounts: unknown[]) => {
				console.log('accounts cahnged');
				setCurrentAccount(accounts[0] as string);
			});
			ethereum.on('chainChanged', function (networkId) {
				window.location.reload();
			});
			checkIfWalletIsConnected();
			getChain();
		}
	}, []);

	return {
		currentAccount,
		connectWallet,
		isCorrectNetwork,
		POLYGON_RPC_URL,
	};
};
