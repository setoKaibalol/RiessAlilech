import Link from "next/link"
import React from "react"

type Props = {}

function kontakt({}: Props) {
	return (
		<div className="container pt-28 pb-10 mx-auto md:px-6">
			<section className="min-h-screen">
				<div className="block rounded-lg p-4 py-20 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
					<div className="flex flex-wrap items-center">
						<div className="w-full shrink-0 grow-0 basis-auto">
							<div className="flex flex-wrap px-3 pt-12 pb-12 md:pb-0 lg:pt-0">
								<div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
									<div className="flex items-start">
										<div className="shrink-0">
											<div className="inline-block rounded-md bg-secondary-base p-4 text-accent-base">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-6 grow">
											<p className="mb-2 font-bold ">TipForYou Support</p>
											<p className="text-neutral-500">support@tipforyou.de</p>
										</div>
									</div>
								</div>
								<div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
									<div className="flex items-start">
										<div className="shrink-0">
											<div className="inline-block rounded-md bg-secondary-base p-4 text-accent-base">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-6 grow">
											<p className="mb-2 font-bold ">Billing Support</p>
											<p className="text-neutral-500">placeholder</p>
											<p className="text-neutral-500 ">+1 placeholder</p>
											<p className="text-neutral-500 ">+1 placeholder</p>
										</div>
									</div>
								</div>
								<div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:mb-0 xl:w-6/12 xl:px-12">
									<div className="align-start flex">
										<div className="shrink-0">
											<div className="inline-block rounded-md bg-secondary-base p-4 text-accent-base">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-6 grow">
											<p className="mb-2 font-bold ">Business inqueries</p>
											<p className="text-neutral-500 ">business@tipforyou.de</p>
										</div>
									</div>
								</div>
								<div className="w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">
									<Link
										href={"/kontakt/form"}
										target="_blank"
										className="align-start flex hover:bg-gray-200 p-2 duration-100 rounded-md">
										<div className="shrink-0">
											<div className="inline-block rounded-md bg-secondary-base p-4 text-accent-base">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="currentColor"
													className="h-6 w-6">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M19 7h5v2h-5V7zm-2 5h7v2h-7v-2zm3 5h4v2h-4v-2zM2 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H2zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
													/>
												</svg>
											</div>
										</div>
										<div className="ml-6 grow">
											<p className="mb-2 font-bold ">Kontaktformular</p>
											<p className="text-neutral-500 ">
												Kontaktiere uns direkt per Nachricht &gt;
											</p>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default kontakt
