'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

export default function GoogleButton() {
	const supabase = createClientComponentClient<Database>({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${process.env.URL}/auth/callback`,
			},
		});
	};

	return (
		<button
			className="w-full hover:bg-gray-800 px-4 py-2 rounded-xl flex items-center justify-center gap-2"
			onClick={handleSignIn}
		>
			<Image
				src="/google.png"
				alt="google sign in"
				width={25}
				height={25}
			/>
			Signup using Google
		</button>
	);
}
