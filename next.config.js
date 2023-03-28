/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"static.vecteezy.com",
			"via.placeholder.com",
			"upload.wikimedia.org",
		],
	},
}

module.exports = nextConfig
