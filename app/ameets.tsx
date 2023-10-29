'use client';

import Likes from './likes';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import moment from 'moment';
import { Playfair_Display, Rubik } from 'next/font/google';
import { useRouter } from 'next/router';

const pfd = Playfair_Display({ weight: ['400', '900'], subsets: ['latin'] });
const rubik = Rubik({ weight: ['400', '900'], subsets: ['latin'] });

export default function Ameets({ ameets }: { ameets: AmeetWithAuthor[] }) {
	const router = useRouter();
	const supabase = createClientComponentClient({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});
	useEffect(() => {
		const channel = supabase
			.channel('realtime ameets')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'ameets',
				},
				(payload) => {
					router.reload();
				}
			)
			.subscribe();
		const channel1 = supabase
			.channel('realtime likes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'likes',
				},
				(payload) => {
					router.reload();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
			supabase.removeChannel(channel1);
		};
	}, [supabase]);

	return (
		<div className="mx-2 grid grid-cols-1 md:grid-cols2 gap-2 pb-2">
			{ameets.map((a: AmeetWithAuthor) => (
				<div
					key={a.id}
					className="border-gray-800  border-top-0 px-4 py-8 flex items-center justify-start border rounded-lg"
				>
					<Image
						className="rounded-full"
						src={a.author.avatar_url}
						alt="User Ameet Avatar"
						width={75}
						height={75}
					/>
					<div className="ml-4 ">
						<p>
							<span className={`${pfd.className} font-black`}>
								{a.author.name}
							</span>
						</p>
						<p className="flex flex-col text-bold">
							<span className="text-sm text-gray-400">
								{moment(a.created_at).format(
									'Qo MMMM YYYY, hh:mm a'
								)}
							</span>
							<span className="text-sm text-gray-400">
								@{a.author.email.split('@')[0]}
							</span>
						</p>
						<pre
							className={rubik.className}
							style={{
								whiteSpace: 'pre-wrap',
							}}
						>
							{a.title}
						</pre>

						<Likes ameet={a} />
					</div>
				</div>
			))}
		</div>
	);
}
