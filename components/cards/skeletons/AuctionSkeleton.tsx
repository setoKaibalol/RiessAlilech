export const SkeletonCard = () => {
	return (
		<div className="p-4 w-full max-h-[700px] animate-pulse bg-primary-base border rounded-lg shadow-md max-w-md">
			<div className="w-full flex flex-col">
				<div className="flex flex-row relative justify-between items-center p-1 mb-2 rounded-lg">
					<div className="bg-gray-300 w-[72%] h-8 rounded"></div>
					<div className="flex flex-row rounded-lg h-full w-[25%] justify-center items-center gap-2 text-xl">
						<div className="bg-gray-300 h-6 w-24 rounded"></div>
					</div>
				</div>
				<div className="md:w-1/2 pt-2 px-2 rounded-t-md border-x border-t">
					<div className="bg-gray-300 relative h-64 rounded-t-md"></div>
				</div>
			</div>
			<div className="flex items-center flex-col md:hidden shadow-mb max-h-20 md:max-w-xs shadow-secondary-base/30 border-b border-x p-1 rounded-b-md justify-evenly text-xl ">
				<div className="flex flex-row justify-start p-2 gap-10 items-center w-full">
					<div className="bg-gray-300 w-16 h-16 rounded-full"></div>
					<div className="bg-gray-300 w-32 h-6 rounded"></div>
				</div>
			</div>
			<div className="flex divide-y-2 text-secondary-base text-lg items-center p-2 flex-col">
				<div className="w-full flex flex-row gap-2 justify-between">
					<div className="bg-gray-300 w-32 h-6 rounded"></div>
					<div className="bg-gray-300 w-20 h-6 rounded"></div>
				</div>
				<div className="w-full flex flex-row gap-2 justify-between">
					<div className="bg-gray-300 w-32 h-6 rounded"></div>
					<div className="bg-gray-300 w-20 h-6 rounded"></div>
				</div>
				<div className="w-full flex flex-row gap-2 justify-between">
					<div className="bg-gray-300 w-48 h-6 rounded"></div>
					<div className="bg-gray-300 w-20 h-6 rounded"></div>
				</div>
			</div>
			<div className="flex flex-row justify-center gap-4 items-center min-h-[100px] w-[280px]">
				<div className="bg-gray-300 w-40 h-6 rounded"></div>
			</div>
		</div>
	)
}
