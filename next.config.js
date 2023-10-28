/** @type {import('next').NextConfig} */
const nextConfig = {
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
