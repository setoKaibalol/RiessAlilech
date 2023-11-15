export const SkeletonCard = () => {
	return (
		<div className=" p-2 h-60 border bg-gray-300 rounded-sm animate-pulse">
			<div className="flex flex-row h-full w-full justify-between">
				<div className="relative h-full w-72">
					<div className="h-full w-full bg-gray-400"></div>
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
