import Image from 'next/image';
import React from 'react';
import { Metadata, truncateEthAddress } from '../../utils';
import Tilt from 'react-parallax-tilt';
interface Props {
	nft: Metadata;
	toggleModal: Function;
	ownerAddress: string;
}

const NftCard = (props: Props) => {
	const { nft, toggleModal, ownerAddress } = props;
	return (
		<Tilt>
			<div
				className="gradient-bg-card rounded-lg p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300 cursor-pointer h-full"
				onClick={() => toggleModal()}
			>
				<div className="flex flex-col justify-center h-full">
					<figure className="mb-2">
						<Image
							width={256}
							height={256}
							src={nft.image}
							alt="NFT"
							className="ml-auto mr-auto"
							priority
						/>
					</figure>
					<div className="rounded-lg p-4 gradient-bg-card-card flex flex-col flex-1">
						<div>
							<h5 className="text-white text-lg xl:text-xl font-bold leading-none">
								{nft.name}
							</h5>
						</div>
						<div className="flex items-center mt-2 h-full">
							<div className="text-xs text-gray-200  bg-black rounded-lg px-3 py-[0.2rem]">
								Owned By {truncateEthAddress(ownerAddress)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Tilt>
	);
};

export default NftCard;
