import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Metadata } from '../../utils';

import { CardsLoader } from './CardsLoader';
import Modal from './Modal';
import NftCard from './NFTCard';

const loaders = [1, 2, 3, 4];

interface Props {
	fetchNFTs: Function;
}

export const Cards = ({ fetchNFTs }: Props) => {
	const [nfts, setNfts] = useState<Metadata[]>([]);
	const [showModal, setShowModal] = useState<Boolean>(false);
	const [loading, setLoading] = useState(false);
	const [selectedNft, setSelectedNft] = useState<number>(-1);

	const { address } = useAccount();

	function toggleModal(i: number) {
		if (i >= 0) {
			setSelectedNft(i);
		}
		setShowModal((prevState) => !prevState);
	}

	useEffect(() => {
		if (address) {
			(async () => {
				setLoading(true);
				let data = await fetchNFTs(address);
				setNfts(data);
				setLoading(false);
			})();
		}
	}, [address, fetchNFTs]);

	return (
		<div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center max-w-6xl gap-x-6 gap-y-10 my-10">
			{loading ? (
				loaders.map((count) => <CardsLoader key={count} />)
			) : nfts.length === 0 ? (
				<h1 className="text-center text-transparent text-4xl text-white w-full bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					No NFTs found
				</h1>
			) : (
				nfts?.map((nft, index) => (
					<NftCard
						nft={nft}
						key={index + nft.name}
						toggleModal={() => toggleModal(index)}
						ownerAddress={address!}
					/>
				))
			)}
			{showModal && (
				<Modal nft={nfts[selectedNft]} toggleModal={() => toggleModal(-1)} />
			)}
		</div>
	);
};
