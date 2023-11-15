import React, { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function ContactForm() {
	const [submitted, setSubmitted] = useState(false)
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		if (searchParams.has("subject")) {
			const subject = searchParams.get("subject")
			if (subject === "report") {
				document.getElementById("subject").value = "Meldung von Kontent"
			} else if (subject === "question") {
				document.getElementById("subject").value = "Frage"
			} else if (subject === "complaint") {
				document.getElementById("subject").value = "Beschwerde"
			} else if (subject === "other") {
				document.getElementById("subject").value = "Anderes"
			} else {
				document.getElementById("subject").value = "Frage"
			}
		}
	}, [searchParams])

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(e.target.email.value)

		let email = e.target.email.value
		let subject = e.target.subject.value
		let message = e.target.message.value

		let data = {
			email,
			subject,
			message,
		}

		console.log(data)

		fetch("/api/contact", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).then((res) => {
			console.log("Response received")
			if (res.status === 200) {
				console.log("Response succeeded!")
				setSubmitted(true)
				e.target.reset()
			}
		})
	}

	return (
		<section className="bg-white py-20">
			<div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
				<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
					Kontaktiere uns direkt
				</h2>
				<p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
					Hier kannst du uns eine Nachricht hinterlassen. Wir werden uns dann
					schnellstmöglich bei dir melden.
				</p>
				<form onSubmit={handleSubmit} action="#" className="space-y-8">
					<div>
						<label
							for="email"
							className="block mb-2 text-sm font-medium text-gray-900 ">
							Deine email
						</label>
						<input
							type="email"
							id="email"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary-base focus:border-secondary-base block w-full p-2.5 "
							placeholder="beispiel@gmail.com"
							required
						/>
					</div>
					<div>
						<label
							for="subject"
							className="block mb-2 text-sm font-medium text-gray-900 ">
							Anliegen
						</label>
						<select
							type="text"
							id="subject"
							className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-secondary-base-500 focus:border-secondary-base-500 "
							placeholder="Let us know how we can help you"
							required>
							<option>Frage</option>
							<option>Beschwerde</option>
							<option>Meldung von Kontent</option>
							<option>Anderes</option>
						</select>
					</div>
					<div className="sm:col-span-2">
						<label
							for="message"
							className="block mb-2 text-sm font-medium text-gray-900 ">
							Deine Nachricht
						</label>
						<textarea
							id="message"
							rows="6"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-secondary-base focus:border-secondary-base "
							placeholder="hinterlasse uns deine Nachricht..."></textarea>
					</div>
					<button
						type="submit"
						className="py-3 px-5 text-sm font-medium text-center text-white text- rounded-lg bg-accent-base duration-100 sm:w-fit hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-secondary-base ">
						Absenden
					</button>
				</form>
			</div>
		</section>
	)
}

export default ContactForm
