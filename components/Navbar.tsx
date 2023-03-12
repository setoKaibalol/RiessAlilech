import React, { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

type Props = {}

function Navbar({}: Props) {
	const { data: session, status } = useSession()
	return (
		<div className="fixed w-40 h-full bg-primary-900 border-secondary-400 border-r-2 flex flex-col items-center">
			{status === "authenticated" ? (
				<div className="flex flex-col w-full justify-center items-center py-2">
					<Image
						alt="image"
						className="rounded-full"
						src={session.user?.image!}
						height={30}
						width={30}></Image>
					<button className="text-white" onClick={() => signOut()}>
						sign out
					</button>
				</div>
			) : (
				status === "unauthenticated" && (
					<button className="text-white" onClick={() => signIn()}>
						sign in
					</button>
				)
			)}
			<div className="flex flex-col gap-2">
				<button className="bg-primary text-white  p-2 px-3 uppercase font-medium rounded-lg duration-200 hover:bg-secondary">
					button
				</button>
				<button className="text-primary-500 p-1 uppercase hover:bg-secondary-100/20 font-medium rounded-lg duration-200">
					link
				</button>
			</div>
		</div>
	)
}

export default Navbar
