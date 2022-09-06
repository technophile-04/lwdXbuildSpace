import Image from 'next/image';
import React from 'react';
import { Metadata } from '../../utils';

interface Props {
	nft: Metadata;
	toggleModal: Function;
}

const Modal = (props: Props) => {
	const nft = props.nft;

	return (
		<div className="fixed flex items-center justify-center z-50 top-0 left-0 h-full w-full overflow-auto bg-[rgba(0,0,0,0.5)] p-1">
			<div className="relative min gradient-modal rounded-2xl p-5 animate-fade-in-down w-7/12">
				<div className="flex mf:flex-row flex-col items-start space-x-4 text-gray-800">
					<Image
						src={nft?.image}
						alt={'nft'}
						width="400"
						height="400"
						className="rounded-xl self-center mf:self-start"
					/>
					<div className="p-1">
						<p className="text-2xl font-bold">{nft.name}</p>
						<p className="text-xl my-1 font-bold">Description</p>
						<p className="m-0 mb-4">{nft.description}</p>
						<p className="text-xl my-1 font-bold">Attributes</p>
						{nft?.attributes?.map((attribute, i) => (
							<div key={i}>
								<div className="mt-2 mb-1 p-1">
									<div className="flex justify-between items-baseline">
										<div className="mb-1 text-base font-medium text-gray-700">
											{attribute?.trait_type}
										</div>
										<p className="text-sm">{attribute?.value}/100</p>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2.5">
										<div
											className="bg-[#32325D] h-2.5 rounded-full"
											style={{ width: `${attribute?.value}%` }}
										></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<span
					className="absolute top-0 right-0 pt-2 pr-5 rounded-full cursor-pointer font-bold text-xl"
					onClick={() => props.toggleModal()}
				>
					&times;
				</span>
			</div>
		</div>
	);
};

export default Modal;
