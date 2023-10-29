'use client';

import React from 'react';
import { Playfair_Display } from 'next/font/google';
const pfd = Playfair_Display({ weight: ['400', '900'], subsets: ['latin'] });
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import SignOut from './signout';

const Navbar = () => {
	const supabase = createClientComponentClient<Database>({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});

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
			<SignOut />
		</div>
	);
};

export default Navbar;
