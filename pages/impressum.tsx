import React from "react"

type Props = {}

function Impressum({}: Props) {
	return (
		<div className="w-full flex justify-center">
			<div className="w-5/6 flex justify-center flex-col sm:p-20 pt-20 pb-20 gap-4">
				<h1 className="text-lg">
					<strong>Impressum</strong>
				</h1>
				<div>
					<h2>
						<strong>Angaben gem&auml;&szlig; &sect; 5 TMG</strong>
					</h2>
					<p>
						Hidden Pleasures Agency Ltd.
						<br />
						Costa Karnavallou 7
						<br />
						8250 Empa - Cyprus
					</p>
				</div>
				<div>
					<strong>Vertreten durch:</strong>
					<p>Younes Alilech</p>
				</div>
				<div>
					<h2>
						<strong>Kontakt</strong>
					</h2>
					<p>
						Telefon: +49 176 55556033
						<br />
						E-Mail: y.alilech@tipforyou.de
					</p>
				</div>
				<div>
					<h2>
						<strong>EU-Streitschlichtung</strong>
					</h2>
					<p>
						Die Europ&auml;ische Kommission stellt eine Plattform zur
						Online-Streitbeilegung (OS) bereit:{" "}
						<a
							className="text-blue-700 font-semibold"
							href="https://ec.europa.eu/consumers/odr/"
							target="_blank"
							rel="noopener noreferrer">
							https://ec.europa.eu/consumers/odr/
						</a>
						<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
					</p>
				</div>
				<div>
					<h2>
						<strong>
							Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
						</strong>
					</h2>
					<p>
						Wir sind nicht bereit oder verpflichtet, an
						Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
						teilzunehmen.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Impressum
