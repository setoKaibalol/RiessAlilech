import Head from "next/head"
import Link from "next/link"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"
import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import TipModal from "@/components/TipModal"
import CreditBalance from "@/components/CreditBalance"

const CreditsPage = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	const [openPaymentModal, setOpenPaymentModal] = useState(false)
	const [amount, setAmount] = useState(0)
	const [selectedOption, setSelectedOption] = useState<number | null>(null)

	const handleOptionSelect = (option: number) => {
		console.log(option)
		setSelectedOption(option)
		setAmount(option)
	}
	switch (status) {
		case "loading":
			return (
				<div className="flex justify-center items-center h-screen bg-primary-base">
					<ClipLoader color="#E0726C" size={150} />
				</div>
			)
		case "unauthenticated":
			return (
				<div className="flex flex-col items-center justify-center h-80">
					<p className="text-center mb-4">
						Du musst angemeldet sein um TipTokens zu kaufen.
					</p>
					<button
						className="py-2 px-4 bg-accent-base text-white font-medium rounded-md"
						onClick={() => signIn()}>
						Login
					</button>
				</div>
			)
		case "authenticated":
			return (
				<div className="min-h-screen h-screen bg-primary-base pb-20">
					<Head>
						<title>Credits</title>
						<meta name="description" content="Credits" />
						<link rel="icon" href="/favicon.ico" />
					</Head>

					<main className="h-full font-primary flex flex-col">
						<TipModal
							isOpen={openPaymentModal}
							onClose={() => {
								setOpenPaymentModal(false)
							}}
							type="credits"
							receiver={session.user.id}
							return_url={process.env.NEXT_PUBLIC_WEBSITE_URL + "/credits"}
							amount={amount}
							creditPayments={false}
							message=""
							sender={{
								email: session?.user.email,
								name: session?.user.name,
								id: session?.user.id,
							}}></TipModal>
						<div className=" flex flex-col h-full justify-center p-2">
							<div className="w-full justify-center py-7 flex">
								<h1 className="text-2xl font-bold">TipTokens</h1>
							</div>
							{
								<>
									<CreditBalance></CreditBalance>

									<div className="bg-white p-4 flex flex-col justify-between h-full rounded-lg mb-4">
										<h2 className="text-lg font-medium mb-2 hidden">
											TipToken Optionen:
										</h2>
										<div className="space-y-4 text-lg font-medium">
											<div
												className={`flex items-center justify-between duration-200 p-2 rounded-lg ${
													selectedOption === 100
														? "bg-accent-base text-white"
														: " bg-gray-100"
												}`}
												onClick={() => handleOptionSelect(100)}>
												<span>100 TipTokens</span>
												<span>€10.00</span>
											</div>
											<div
												className={`flex items-center justify-between duration-200 p-2 rounded-lg ${
													selectedOption === 500
														? "bg-accent-base text-white"
														: " bg-gray-100"
												}`}
												onClick={() => handleOptionSelect(500)}>
												<span>500 TipTokens</span>
												<span>€50.00</span>
											</div>
											<div
												className={`flex items-center justify-between duration-200 p-2 rounded-lg ${
													selectedOption === 1000
														? "bg-accent-base text-white"
														: " bg-gray-100"
												}`}
												onClick={() => handleOptionSelect(1000)}>
												<span>1000 TipTokens</span>
												<span>€100.00</span>
											</div>
										</div>
									</div>
									<button
										onClick={() => {
											setOpenPaymentModal(true)
										}}
										className={`py-2 w-full px-4 font-medium rounded-md ${
											selectedOption
												? "bg-accent-base text-white"
												: "bg-gray-400 text-gray-700"
										}`}
										disabled={!selectedOption}>
										Kaufen
									</button>
								</>
							}
						</div>
					</main>
				</div>
			)

		default:
			return (
				<div className="flex flex-col items-center justify-center h-80">
					<p className="text-center mb-4">
						Du musst angemeldet sein um TipTokens zu kaufen.
					</p>
					<button
						className="py-2 px-4 bg-accent-base text-white font-medium rounded-md"
						onClick={() => signIn()}>
						Login
					</button>
				</div>
			)
	}
}

export default CreditsPage
