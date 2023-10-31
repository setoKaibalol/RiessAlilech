import { signIn } from "next-auth/react"
import Link from "next/link"
import React, { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "sonner"

export default function SignIn({}) {
	const { data: session, status, update } = useSession()

	const router = useRouter()

	useEffect(() => {
		if (session) {
			// Redirect to the previous page or to the homepage if no previous page is specified
			router.push("/")
		}
	}, [session, router])

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		let email = e.target.email.value
		let password = e.target.password.value

		if (!email) {
			toast.warning("Email fehlt", {})
			return
		}

		if (!password) {
			toast.warning("Passwort fehlt", {})
			return
		}

		const response = await signIn("credentials", {
			email,
			password,
			redirect: false,
		})
			.then((res) => {
				console.log("response: ", res)
				if (res?.error) {
					if (res.status === 401) {
						toast.error("Email nicht gefunden oder Passwort falsch")
						return
					}
					return
				}

				if (res?.status === 200) {
					toast.success("Erfolgreich angemeldet")
					router.push("/")
				}
			})
			.catch((err) => {
				toast.error("Fehler beim Anmelden")
			})

		console.log(response)
	}

	if (session) {
		return null
	}

	return (
		<div className="pt-20  max-h-screen overflow-hidden">
			<section className="h-full flex flex-col justify-start w-full bg-gradient-center from-white to-accent-base via-accent-base min-h-screen">
				<div className="flex flex-col items-center w-full justify-start px-6 py-8 mx-auto md:h-full lg:py-0">
					<div className="w-full h-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary-base border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
								Willkommen zurück
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<div className="space-y-4">
									<div>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-white">
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
											placeholder="name@company.com"
										/>
									</div>
									<div>
										<label
											htmlFor="password"
											className="block mb-2 text-sm font-medium text-white">
											Passwort
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
								</div>
								<div className="space-y-4 md:space-y-6">
									<button
										type="submit"
										className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-accent-base">
										Anmelden
									</button>
									<p className="text-sm font-light text-gray-400">
										Du hast noch keinen Account?{" "}
										<Link
											href="/auth/signup"
											className="font-medium text-white hover:underline">
											Sign up here
										</Link>
									</p>
								</div>

								<div className="text-white flex flex-row justify-center items-center text-center">
									<div className="w-full bg-white h-1"></div>
									<div className="w-full">ODER</div>
									<div className="w-full bg-white h-1"></div>
								</div>
								<div className="space-y-4 md:space-y-6">
									<div className="max-w-md">
										<button
											onClick={() => {
												signIn("google").then((res) => {})
											}}
											type="button"
											className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
											<svg
												className="mr-2 -ml-1 w-4 h-4"
												aria-hidden="true"
												focusable="false"
												data-prefix="fab"
												data-icon="google"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 488 512">
												<path
													fill="currentColor"
													d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
											</svg>
											Sign up with Google<div></div>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
