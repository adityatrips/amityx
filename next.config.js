/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { appDir: true },
	images: {
		remotePatterns: [
			{
				hostname: 'avatars.githubusercontent.com',
			},
			{
				hostname: '*.googleusercontent.com',
			},
		],
	},
};

module.exports = nextConfig;
