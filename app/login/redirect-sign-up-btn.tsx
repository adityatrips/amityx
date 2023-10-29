'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpButton = () => {
	let router = useRouter();

	return (
		<button
			onClick={() => {
				router.push('/signup');
			}}
			className="w-full hover:bg-gray-800 px-4 py-2 rounded-xl flex itemsc-center justify-center gap-2"
		>
			Signup using Email
		</button>
	);
};

export default SignUpButton;
