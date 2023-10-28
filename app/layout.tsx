import type { Metadata } from 'next';
import './globals.css';
import { Rubik } from 'next/font/google';
const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AmityX - X for Amity',
	description: 'Developed by Aditya Tripathi',
	creator: 'Aditya Tripathi',
	applicationName: 'AmityX',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={rubik.className}>
				<div className="min-h-screen max-w-full bg-gray-900">
					<div className="container mx-auto">{children}</div>
				</div>
			</body>
		</html>
	);
}
