import React, { useEffect, useState } from "react"
import { useUserContext } from "@/context"
import { SkeletonCard } from "@/components/cards/skeletons/CreatorSkeleton"
import CreatorCard from "@/components/cards/CreatorCard"

type Props = {
	search: string
}

function Creators({ search }: Props) {
	const {
		creators,
		setCreators,
		creatorsStatus,
		setCreatorsStatus,
		refreshCreators,
		setRefreshCreators,
	} = useUserContext()

	useEffect(() => {
		if (refreshCreators) {
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
		<div className="min-h-screen md:pt-20 flex flex-col items-center  bg-primary-base ">
			<div className="flex md:flex-col justify-center flex-wrap w-full gap-1 h-full pb-20">
				{creatorsStatus === "loading" &&
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => <SkeletonCard key={i} />)}
				{creatorsStatus === "loaded" &&
					creators
						.filter((creator, index) => {
							if (search === "") {
								return creator
							}
							if (
								creator.nickName.toLowerCase().includes(search.toLowerCase())
							) {
								return creator
							}
							if (
								creator.realName.toLowerCase().includes(search.toLowerCase())
							) {
								return creator
							}
							return
						})
						.map((creator, index) => (
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
