import { useState } from "react"

interface FAQItem {
	question: string
	answer: string
}

interface Props {
	items: FAQItem[]
}

export default function FAQ({ items }: Props) {
	const [activeIndex, setActiveIndex] = useState(-1)
	const [prevIndex, setPrevIndex] = useState(-1)

	const handleItemClick = (index: number) => {
		setPrevIndex(activeIndex)
		if (index === activeIndex) {
			setActiveIndex(-1)
		} else {
			setActiveIndex(index)
		}
	}

	return (
		<div className="p-2 flex flex-col gap-2">
			{items.map((item, index) => {
				return (
					<div key={index}>
						<div
							className={`cursor-pointer bg-white p-2 py-4 rounded-md flex text-center hover:bg-gray-100 relative z-10 justify-between px-5 duration-200 items-center ${
								activeIndex === -1
									? prevIndex < index && " animate-move-down"
									: "" + (activeIndex === index && " rounded-b-none")
							}`}
							onClick={() => handleItemClick(index)}>
							<h3 className="text-lg font-medium">{item.question}</h3>
							<svg
								className={`w-6 h-6 transform ${
									index === activeIndex ? "rotate-180" : ""
								}`}
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6 9L12 15L18 9"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div
							className={`duration-200 relative z-0 px-10 bg-white rounded-b-md ${
								index === activeIndex
									? "animate-fade-in p-2 py-4"
									: "animate-fade-out"
							}`}
							style={{
								opacity: index === activeIndex ? 1 : 0,
								height: index === activeIndex ? "auto" : 0,
							}}>
							{item.answer}
						</div>
					</div>
				)
			})}
		</div>
	)
}
