'use client';

import { redirect } from 'next/navigation';
import React from 'react';
import { Playfair_Display } from 'next/font/google';
const pfd = Playfair_Display({ weight: ['400', '900'], subsets: ['latin'] });

const Heading = () => {
	return (
		<h1
			onClick={() => {
				redirect('/');
			}}
			className={`${pfd.className} text-2xl font-black`}
		>
			AmityX
		</h1>
	);
};

export default Heading;
