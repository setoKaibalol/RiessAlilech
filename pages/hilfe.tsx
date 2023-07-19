import FAQ from "@/components/FAQComponent"
import React from "react"

type Props = {}

function Hilfe({}: Props) {
	return (
		<div className="min-h-screen bg-gradient-center from-primary-base via-accent-base to-accent-base ">
			<div className="h-screen w-full flex flex-col justify-start pt-20">
				<FAQ
					items={[
						{
							question: "Was ist TipForYou?",
							answer:
								"TipForYou ist eine Platform die es Creatorn ermöglicht Tips zu erhalten und Auctions zu erstellen. In unserer About Sektion kannst du mehr über uns erfahren.",
						},
						{
							question: "Was ist ein Creator?",
							answer:
								"Ein Creator ist eine Person die digitalen Content erstellt.",
						},
						{
							question: "Was ist eine Auction?",
							answer:
								"In einer Auction kann ein Creator einen Gegenstand versteigern. Der Höchstbietende erhält den Gegenstand.",
						},
						{
							question: "Kann ich ein Creator werden?",
							answer:
								"Schicke gerne deine Bewerbung mit deinem Namen, Alter, Erfahrungen und deinen Socials an y.alilech@tipforyou.de.",
						},
						{
							question: "Ich brauche Hilfe!",
							answer:
								"Falls du Unterstüzung brauchst kannst du uns per email unter support@tipforyou.de kontaktieren.",
						},
						{
							question: "Ich benötige Billing Support!",
							answer:
								"Falls du Billing Support benötigst schreibe bitte eine E-Mail an billing@epoch.com",
						},
					]}></FAQ>
			</div>
		</div>
	)
}

export default Hilfe
