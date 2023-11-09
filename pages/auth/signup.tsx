import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import router from "next/router"
import { prisma } from "@/prisma/PrismaClient"
import { IoInformationCircle } from "react-icons/io5"

type Props = {
	users: any
}

function Signup(props: Props) {
	const { users } = props
	const [emailMessage, setEmailMessage] = useState("")
	const [emailExists, setEmailExists] = useState(false)
	const [passwordMessage, setPasswordMessage] = useState("")
	const [disabled, setDisabled] = useState(false)
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [loading, setLoading] = useState(true)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		setLoading(true)
		let email = e.target.email.value
		let password = e.target.password.value
		let confirmPassword = e.target["confirm-password"].value

		if (password !== confirmPassword) {
			toast.warning("Passwörter stimmen nicht überein.")
			setLoading(false)
			return
		}

		if (users.find((user: any) => user.email === email)) {
			toast.warning("Email bereits vergeben.")
			setLoading(false)
			return
		}

		fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.error) {
					toast.error(data.error)
					setLoading(false)
				} else {
					toast.success("Account erstellt")
					setLoading(false)
					router.push("/auth/signin")
				}
			})
	}

	useEffect(() => {
		if (
			password === confirmPassword ||
			password === "" ||
			confirmPassword === ""
		) {
			setPasswordMessage("")
		}
		if (
			password !== confirmPassword &&
			password !== "" &&
			confirmPassword !== ""
		) {
			setPasswordMessage("Passwörter stimmen nicht überein.")
		}
	}, [password, confirmPassword])

	return (
		<div className="pt-20 lg:pt-40 max-h-screen overflow-hidden">
			<section className="h-full flex flex-col justify-start w-full bg-gradient-center from-white to-accent-base via-accent-base min-h-screen">
				<div className="flex flex-col items-center w-full justify-start px-6 py-8 mx-auto md:h-full lg:py-0">
					<div className="w-full h-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-secondary-base border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
								Erstelle einen Account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-white">
										Deine E-Mail
									</label>
									<input
										type="email"
										name="email"
										id="email"
										onChange={(e) => {
											if (
												users.find((user: any) => user.email === e.target.value)
											) {
												setEmailExists(true)
												setEmailMessage("Diese Email ist bereits vergeben.")
											} else {
												setEmailExists(false)
												setEmailMessage("")
											}
										}}
										className="bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
										placeholder="name@company.com"
									/>
								</div>
								{emailMessage && (
									<div className="bg-gray-600 gap-3 p-1 px-4 rounded-lg flex flex-row justify-start items-center text-center">
										<IoInformationCircle
											size={25}
											color="white"></IoInformationCircle>
										<p className="text-sm font-light text-gray-100">
											{emailMessage}
										</p>
									</div>
								)}
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
										value={password}
										onChange={(e) => {
											setPassword(e.target.value)
										}}
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block mb-2 text-sm font-medium text-white">
										Passwort bestätigen
									</label>
									<input
										type="password"
										name="confirm-password"
										id="confirm-password"
										value={confirmPassword}
										onChange={(e) => {
											setConfirmPassword(e.target.value)
										}}
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
										required
									/>
								</div>

								<div className="min-h-[50px]">
									{passwordMessage && (
										<div className="bg-gray-600 h-full gap-3 p-2 px-4 rounded-lg flex flex-row justify-start items-center text-center">
											<IoInformationCircle
												size={25}
												color="white"></IoInformationCircle>
											<p className="text-sm font-light text-gray-100">
												{passwordMessage}
											</p>
										</div>
									)}
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 focus:ring-primary-600 ring-offset-gray-800"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label htmlFor="terms" className="font-light text-gray-300">
											Ich akzeptiere die{" "}
											<Link
												className="font-medium text-white hover:underline"
												href="/privacy-policy">
												Geschäftsbedingungen
											</Link>
										</label>
									</div>
								</div>
								<button
									type="submit"
									disabled={disabled}
									className={`w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-accent-base`}>
									Account erstellen
								</button>
								<p className="text-sm font-light text-gray-400">
									Hast du schon einen Account?{" "}
									<Link
										href="/auth/signin"
										className="font-medium text-white hover:underline">
										Login hier
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Signup

export async function getServerSideProps(context: { params: any }) {
	const users = await prisma.user.findMany()
	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
		},
	}
}
