export const CardsLoader = () => {
	return (
		<div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300 cursor-pointer">
			<figure className="mb-2">
				<div className="h-64 w-64 ml-auto mr-auto bg-gray-400 rounded-lg animate-pulse" />
			</figure>
			<div className="rounded-lg p-4 gradient-bg-card-card flex flex-col animate-pulse">
				<div className="flex items-center mt-2">
					<div className="text-xs text-gray-200  bg-gray-400 animate-pulse rounded-lg px-2 py-[0.1rem]">
						<span className="text-transparent">randomTextrandomText</span>
					</div>
				</div>

				<div className="flex items-center mt-2">
					<div className="text-xs text-gray-200  bg-gray-400 animate-pulse rounded-lg px-2 py-[0.1rem]">
						<span className="text-transparent">randomText</span>
					</div>
				</div>
			</div>
		</div>
	);
};
