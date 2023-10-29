'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

const SignOut = () => {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const isSession = async () => {
			let user = (await supabase.auth.getUser()).data.user!;

			console.log(user);

			if (user !== undefined || user !== null) {
				setIsLogged(true);
			} else {
				setIsLogged(false);
			}
		};

		isSession();

		return () => {};
	}, []);

	const supabase = createClientComponentClient<Database>({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		window.location.reload();
	};

	isLogged && (
		<button
			className="text-xs txt-gray-400"
			onClick={handleSignOut}
		>
			Logout
		</button>
	);

	return null;
};

export default SignOut;
