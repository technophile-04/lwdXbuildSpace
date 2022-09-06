import { useEffect, useState } from 'react';
import { useWallet } from '../../hooks';
import { fetchLWD3Nfts, Metadata } from '../../utils';

import { CardsLoader } from './CardsLoader';
import Modal from './Modal';
import NftCard from './NFTCard';

const loaders = [1, 2, 3, 4, 5];

export const Cards = () => {
	const [nfts, setNfts] = useState<Metadata[]>([]);
	const [showModal, setShowModal] = useState<Boolean>(false);
	const [loading, setLoading] = useState(false);
	const [selectedNft, setSelectedNft] = useState<number>(-1);

	const { currentAccount } = useWallet();

	useEffect(() => {
		if (currentAccount) {
			fetchLWD3Nfts(currentAccount);
		}
	}, [currentAccount]);

	function toggleModal(i: number) {
		if (i >= 0) {
			setSelectedNft(i);
		}
		setShowModal((prevState) => !prevState);
	}

	return (
		<div className="grid grid-cols-4 gap-6 justify-center max-w-6xl gap-x-6 gap-y-10 my-10">
			{loading ? (
				loaders.map((count) => <CardsLoader key={count} />)
			) : nfts.length === 0 ? (
				<h1 className="text-center text-4xl text-white w-full">
					No NFTs found
				</h1>
			) : (
				nfts?.map((nft, index) => (
					<NftCard
						nft={nft}
						key={index + nft.name}
						toggleModal={() => toggleModal(index)}
						ownerAddress={currentAccount!}
					/>
				))
			)}
			{showModal && (
				<Modal nft={nfts[selectedNft]} toggleModal={() => toggleModal(-1)} />
			)}
		</div>
	);
};
