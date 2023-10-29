'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Verified = () => {
	const [timeLeft, setTimeLeft] = useState(5);
	const router = useRouter();

	useEffect(() => {
		if (timeLeft === 0) {
			router.push('/login');
		}

		if (!timeLeft) return;

		const intervalId = setInterval(() => {
			// @ts-ignore
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);
	return (
		<div className="flex justify-center items-center flex-col min-h-screen">
			<h1 className="text-4xl">Email has been verified.</h1>
			<p>Redirecting you to login page in {timeLeft} seconds.</p>
		</div>
	);
};

export default Verified;
