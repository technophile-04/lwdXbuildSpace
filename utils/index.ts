import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
	apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RPC,
	network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

export const LWD_COLLECTION_ADDRESS =
	'0x1Ed25648382c2e6Da067313e5DAcb4F138Bc8b33';
export const BUILDSPACE_COLLECTION_ADDRESS =
	'0x3CD266509D127d0Eac42f4474F57D0526804b44e';

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

// --------------------------------------------------
// Function to fetch LWD Nfts
// --------------------------------------------------
export const fetchLWD3Nfts = async (address: string) => {
	const nftsForOwner = await alchemy.nft.getNftsForOwner(
		'0x0d1f2bd5351a65a78ac0bef3c8faef643c046508'
	);

	const lwdTokenIdsMinted = [];
	for (const nft of nftsForOwner.ownedNfts) {
		if (
			LWD_COLLECTION_ADDRESS.toLocaleLowerCase() ===
			nft.contract.address.toLocaleLowerCase()
		) {
			lwdTokenIdsMinted.push(nft.tokenId);
		}
	}

	const lwdNftData: Metadata[] = await Promise.all(
		lwdTokenIdsMinted.map(async (tokenId) => {
			const nftMetadata = await alchemy.nft.getNftMetadata(
				LWD_COLLECTION_ADDRESS,
				tokenId
			);

			console.log(nftMetadata);
			return {
				name: nftMetadata.title,
				image: nftMetadata.media[0].gateway,
				description: nftMetadata.description,
			};
		})
	);

	return lwdNftData;
};

// --------------------------------------------------
// Function to fetch BuildSpace NFTs
// --------------------------------------------------
export const fetchBuildSpaceNfts = async (address: string) => {
	const nftsForOwner = await alchemy.nft.getNftsForOwner(
		'0x55b9CB0bCf56057010b9c471e7D42d60e1111EEa'
	);

	const lwdTokenIdsMinted = [];
	for (const nft of nftsForOwner.ownedNfts) {
		if (
			BUILDSPACE_COLLECTION_ADDRESS.toLocaleLowerCase() ===
			nft.contract.address.toLocaleLowerCase()
		) {
			lwdTokenIdsMinted.push(nft.tokenId);
		}
	}

	const buildSpaceData: Metadata[] = await Promise.all(
		lwdTokenIdsMinted.map(async (tokenId) => {
			const nftMetadata = await alchemy.nft.getNftMetadata(
				BUILDSPACE_COLLECTION_ADDRESS,
				tokenId
			);

			console.log(nftMetadata);
			return {
				name: nftMetadata.title,
				image: nftMetadata.media[0].gateway,
				description: nftMetadata.description,
			};
		})
	);

	return buildSpaceData;
};

// --------------------------------------------------
// Truncate address
// --------------------------------------------------
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
export const truncateEthAddress = (address: string) => {
	const match = address?.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

export * from './rainbowKit';
