'use client';

import React from 'react';
import { Playfair_Display } from 'next/font/google';
const pfd = Playfair_Display({ weight: ['400', '900'], subsets: ['latin'] });
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

const Navbar = () => {
	const supabase = createClientComponentClient<Database>({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		redirect('/');
	};

	const isSession = () => {
		let b;

		supabase.auth.getSession().then((res) => {
			if (res.data.session) {
				b = true;
			} else {
				b = false;
			}
		});

		if (b) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="h-[10vh] flex flex-1 justify-center items-center flex-col md:flex-row md:justify-between">
			<h1
				onClick={() => {
					redirect('/');
				}}
				className={`${pfd.className} text-2xl font-black`}
			>
				AmityX
			</h1>
			{isSession() && (
				<button
					className="text-xs txt-gray-400"
					onClick={handleSignOut}
				>
					Logout
				</button>
			)}
		</div>
	);
};

export default Navbar;
