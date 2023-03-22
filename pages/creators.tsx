import React, { useEffect, useState } from "react"
import { useUserContext } from "@/context"
import { SkeletonCard } from "@/components/cards/ItemCardSkeleton"
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
		<div className="min-h-screen pt-20 flex justify-center bg-primary ">
			<div className="flex flex-wrap w-4/5 h-full py-10 gap-2">
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
