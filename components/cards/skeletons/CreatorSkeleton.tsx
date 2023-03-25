export const SkeletonCard = () => {
	return (
		<div className="p-4 border w-80 hover:shadow-md h-60 hover:-translate-y-1 hover:shadow-black/40 duration-200 rounded-lg shadow-black/40 shadow-sm max-w-sm w-full hover:translate">
			<div className="flex flex-row h-full w-full justify-between">
				<div className="relative h-full w-72">
					<div className="h-full w-full rounded-full bg-gray-400"></div>
				</div>
				<div className="w-full flex flex-col justify-evenly items-center">
					<div className="flex flex-col gap-2 text-2xl font-medium">
						<p className="h-4 w-22 bg-gray-400"></p>
						<p className="h-4 w-30 bg-gray-400"></p>
						<p className="h-4 w-26 bg-gray-400"></p>
						<p className="h-4 w-12 bg-gray-400"></p>
						<p className="h-4 w-38 bg-gray-400"></p>
						<p className="h-4 w-24 bg-gray-400"></p>
					</div>
				</div>
			</div>
		</div>
	)
}
