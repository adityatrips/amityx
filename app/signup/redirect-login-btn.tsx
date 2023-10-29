'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const LoginBtn = () => {
	let router = useRouter();

	return (
		<button
			onClick={() => {
				router.push('/login');
			}}
			className="w-full hover:bg-gray-800 px-4 py-2 rounded-xl flex itemsc-center justify-center gap-2"
		>
			Login
		</button>
	);
};

export default LoginBtn;
