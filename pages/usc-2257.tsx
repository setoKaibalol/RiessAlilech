import React from "react"

type Props = {}

function USC({}: Props) {
	let CustodianOfRecords = `
    Custodian of Records
    Rieß - Alilech GbR 
    Saseler Straße 163 
    22145 Hamburg / Germany
    `
	return (
		<div className=" min-h-screen sm:pt-40 pt-24 flex flex-col gap-4 md:px-40 px-10">
			<h2 className="font-medium">
				18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement
			</h2>
			<div>
				In compliance with the Federal Labeling and Record-Keeping Law (also
				known as 18 U.S.C. 2257), all models located within our domain were 18
				years of age or older during the time of photography. All models proof
				of age is held by the custodian of records, which is listed below,
				organized by producer. All content and images are in full compliance
				with the requirements of 18 U.S.C. 2257 and associated regulations.
			</div>
			<div className=" whitespace-pre-wrap">{CustodianOfRecords}</div>
		</div>
	)
}

export default USC
