import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RPC,
	network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

export const LWD_COLLECTION_ADDRESS =
	'0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33';

type Attribute = {
	trait_type: string;
	value: number;
};

export interface Metadata {
	name: string;
	attributes?: Attribute[];
	description?: string;
	image: string;
}

// Function to fetch LWD Nfts
export const fetchLWD3Nfts = async (address: string) => {
	const nftsForOwner = await alchemy.nft.getNftsForOwner(
		'0x0d1f2bd5351a65a78ac0bef3c8faef643c046508'
	);
	console.log('number of NFTs found:', nftsForOwner.totalCount);
	console.log('...');

	for (const nft of nftsForOwner.ownedNfts) {
		console.log('===');
		if (
			LWD_COLLECTION_ADDRESS.toLowerCase() ===
			nft.contract.address.toLowerCase()
		) {
			console.log('contract address:', nft.contract.address);
			console.log('token ID:', nft.tokenId);
		}
	}
};

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
export const truncateEthAddress = (address: string) => {
	const match = address?.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};
