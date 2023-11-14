import React from "react"

type Props = {}

function ComplianceNotice({}: Props) {
	return (
		<div className="w-full flex justify-center">
			<div className="w-5/6 flex justify-center flex-col sm:p-20 pt-20 pb-20 gap-4 min-h-screen">
				<h1 className="text-lg">
					<strong>18 U.S.C. Compliance Notice</strong>
				</h1>
				<p>
					In compliance with the Federal Labeling and Record-Keeping Law (also
					known as 18 U.S.C. 2257), all models located within our domain were 18
					years of age or older during the time of photography. All models proof
					of age is held by the custodian of records, which is listed below,
					organized by producer. All content and images are in full compliance
					with the requirements of 18 U.S.C. 2257 and associated regulations.
				</p>
			</div>
		</div>
	)
}

export default ComplianceNotice
