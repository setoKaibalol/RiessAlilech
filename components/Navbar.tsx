import React, { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

type Props = {}

function Navbar({}: Props) {
	const { data: session, status } = useSession()
	console.log(status)
	return (
		<div className="fixed w-20 h-full bg-black">
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
		</div>
	)
}

export default Navbar
