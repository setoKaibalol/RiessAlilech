import React, { useEffect, useState } from "react"
import { useUserContext } from "@/context"
import { SkeletonCard } from "@/components/cards/skeletons/CreatorSkeleton"
import CreatorCard from "@/components/cards/CreatorCard"

type Props = {}

function Creators({}: Props) {
	const {
		creators,
		setCreators,
		creatorsStatus,
		setCreatorsStatus,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()

	useEffect(() => {
		if (refreshCreators && (!creators || creators.length === 0)) {
			setCreatorsStatus("loading")

			fetch("/api/user/creators/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setCreators(data)
					setCreatorsStatus("loaded")
					setRefreshCreators(false)
				})
				.catch((err) => {
					console.log(err)
					setRefreshCreators(false)
				})
		}
	}, [refreshCreators])

	useEffect(() => {
		if (!creators || creators.length === 0) {
			setCreatorsStatus("loading")
			fetch("/api/user/creators/get", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			})
				.then((res) => res.json())
				.then((data) => {
					setCreators(data)
					setCreatorsStatus("loaded")
					setRefreshCreators(false)
				})
				.catch((err) => {
					console.log(err)
					setRefreshCreators(false)
				})
		}
	}, [])
	return (
		<div className="min-h-screen md:pt-20 pt-10 flex justify-center  bg-primary-base ">
			<div className="flex md:flex-col flex-wrap w-full justify-center gap-4 h-full pb-20">
				<h3 className="font-bold text-2xl">Creators:</h3>
				{creatorsStatus === "loading" &&
					[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
				{creatorsStatus === "loaded" &&
					creators.map((creator, index) => (
						<CreatorCard
							status={creatorsStatus}
							key={index}
							creator={creator}
						/>
					))}
			</div>
		</div>
	)
}

export default Creators
