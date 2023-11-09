import React from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useUserContext } from "./../context"

type Props = {}

function CreditBalance({}: Props) {
	const { active, setActive, showMobileMenu, setShowMobileMenu } =
		useUserContext()

	const { data: session, status } = useSession()
	return session ? (
		<Link
			href={"/credits"}
			onClick={() => {
				setShowMobileMenu(false)
			}}
			className="flex items-center justify-center bg-primary-base p-2 border border-accent-base rounded-lg shadow-md">
			<div className="flex flex-row items-center">
				<span className="text-accent-base text-lg font-bold mr-2">
					{session.user.credits}
				</span>
				<span className="text-secondary-base font-bold">TipTokens</span>
			</div>
			<div className="ml-4">
				<svg
					className="w-8 h-8 text-accent-base"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V10.55L16 14H14L12 11.31L10 14H8L11 10.55V7Z"
						fill="currentColor"
					/>
				</svg>
			</div>
		</Link>
	) : null
}

export default CreditBalance
