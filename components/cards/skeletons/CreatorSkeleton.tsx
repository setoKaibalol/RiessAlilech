export const SkeletonCard = () => {
	return (
		<div className="flex flex-col justify-center items-center font-primary w-[46%] h-auto bg-primary-base rounded-lg shadow-black/40 max-w-sm">
			<div className="w-full relative h-36">
				<div className="bg-gray-300 w-full h-full rounded-t-md"></div>
			</div>
			<div className="bg-primary-base w-full rounded-b-md">
				<div className="py-2 px-3">
					<div className="bg-gray-300 gap-2 text-lg font-bold items-center flex flex-row w-full h-6 rounded"></div>
				</div>
			</div>
		</div>
	)
}
