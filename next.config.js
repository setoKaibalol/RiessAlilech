/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	productionBrowserSourceMaps: true,
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"static.vecteezy.com",
			"lh3.googleusercontent",
			"via.placeholder.com",
			"upload.wikimedia.org",
			"pbs.twimg.com",
			"drive.google.com",
		],
	},
}

module.exports = nextConfig
