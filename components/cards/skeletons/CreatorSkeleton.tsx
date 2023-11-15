export const SkeletonCard = () => {
	return (
		<div className="md:p-0 font-primary h-48 rounded-b-md border-b border-x hover:shadow-md md:w-40 w-[46%] hover:-translate-y-0.5 hover:shadow-black/40 duration-200 rounded-lg max-w-sm">
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
