import Link from "next/link"
import React, { useState, useEffect } from "react"

type Props = {}

function EightheenPlusPanel({}: Props) {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const ageVerified = localStorage.getItem("ageVerified")
		if (ageVerified) {
			setOpen(false)
		} else {
			setOpen(true)
		}
	}, [])

	const LeaveSiteButton = () => {
		const handleLeave = () => {
			window.location.href = "https://www.google.com"
		}

		return (
			<button
				className="p-2 rounded-md max-w-md w-full bg-secondary-base/80 hover:bg-secondary-base/60 duration-100 text-primary-base"
				onClick={handleLeave}
				aria-label="Verlassen Sie die Website, wenn Sie unter 18 Jahre alt sind">
				Ich bin unter 18 - verlassen
			</button>
		)
	}

	const EnterSiteButton = () => {
		const handleEnter = () => {
			setOpen(false)
			localStorage.setItem("ageVerified", "true")
		}

		return (
			<button
				className="p-2 rounded-md max-w-md w-full bg-accent-base hover:bg-accent-base/80 duration-75 text-primary-base"
				onClick={handleEnter}>
				Ich bin 18 oder älter - enter
			</button>
		)
	}

	return open ? (
		<div className="fixed flex flex-col z-50 w-full justify-center items-center h-full bg-black/90">
			<div className=" bg-primary-base w-[80%] gap-1 h-auto flex flex-col rounded-md">
				<div className=" font-bold text-xl sm:text-2xl w-full text-center sm:p-6 p-2">
					Wichtiger Hinweis: Inhalte nur für Erwachsene (18+)
				</div>
				<div className="text-sm px-3 max-h-60  overflow-y-scroll tracking-tight flex flex-col gap-2">
					<p>
						Bevor Sie fortfahren, möchten wir Sie darauf aufmerksam machen, dass
						diese Seite Inhalte enthält, die ausschließlich für Erwachsene
						bestimmt sind. Mit dem Zugriff auf unsere Website bestätigen Sie,
						dass Sie mindestens 18 Jahre alt sind und dass Sie mit der Ansicht
						von Inhalten für Erwachsene einverstanden sind.
					</p>
					<p>
						Unsere Inhalte sind vielfältig und sollen unterschiedliche
						Interessen und Vorlieben ansprechen. Wir legen großen Wert darauf,
						eine sichere und respektvolle Umgebung für alle Nutzer zu schaffen.
						Wenn Sie Bedenken bezüglich der Inhalte haben oder Fragen zu unserer
						Website haben, zögern Sie bitte nicht, uns zu kontaktieren.
					</p>
					<p>
						Indem Sie fortfahren, übernehmen Sie die volle Verantwortung für
						Ihre Handlungen und bestätigen, dass Sie die rechtlichen
						Anforderungen für die Ansicht von Erwachseneninhalten in Ihrer
						Region erfüllen. Wir übernehmen keine Haftung für etwaige
						Konsequenzen, die sich aus Ihrer Entscheidung ergeben, auf unsere
						Inhalte zuzugreifen.
					</p>
					<p>Wir schätzen Ihr Verständnis und Ihre Kooperation.</p>
				</div>
				<div className="w-full flex flex-col gap-2 p-4 justify-center items-center">
					<EnterSiteButton />
					<LeaveSiteButton />
				</div>
			</div>
		</div>
	) : null
}

export default EightheenPlusPanel
