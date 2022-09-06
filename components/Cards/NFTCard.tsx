import Image from 'next/image';
import React from 'react';
import { Metadata, truncateEthAddress } from '../../utils';
interface Props {
	nft: Metadata;
	toggleModal: Function;
	ownerAddress: string;
}

const NftCard = (props: Props) => {
	const { nft, toggleModal, ownerAddress } = props;
	return (
		<div
			className="gradient-bg-card rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300 cursor-pointer"
			onClick={() => toggleModal()}
		>
			<figure className="mb-2">
				<Image
					height={64}
					src={nft.image}
					alt="NFT"
					className="ml-auto mr-auto"
				/>
			</figure>
			<div className="rounded-lg p-4 gradient-bg-card-card flex flex-col">
				<div>
					<h5 className="text-white text-2xl font-bold leading-none">
						{nft.name}
					</h5>
				</div>
				<div className="flex items-center mt-2">
					<div className="text-xs text-gray-200  bg-black rounded-lg px-2 py-[0.1rem]">
						Owned By {truncateEthAddress(ownerAddress)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NftCard;
