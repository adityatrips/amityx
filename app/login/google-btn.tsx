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
				redirectTo: `${location.origin}/auth/gocallback`,
			},
		});
	};

	return (
		<div className="flex-1 flex justify-center items-center">
			<button
				className="hover:bg-gray-800 p-8 rounded-xl"
				onClick={handleSignIn}
			>
				<Image
					src="/google.png"
					alt="google sign in"
					width={100}
					height={100}
				/>
			</button>
		</div>
	);
}
