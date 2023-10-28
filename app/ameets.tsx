'use client';

import Likes from './likes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

export default function Ameets({ ameets }: { ameets: AmeetWithAuthor[] }) {
	const supabase = createClientComponentClient({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});
	const router = useRouter();

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
					router.refresh();
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [router, supabase]);

	return ameets.map((a: AmeetWithAuthor) => (
		<div
			key={a.id}
			className="border-gray-800  border-top-0 px-4 py-8 flex"
		>
			<div className="h-12 w-12">
				<Image
					className="rounded-full"
					src={a.author.avatar_url}
					alt="User Ameet Avatar"
					width={48}
					height={48}
				/>
			</div>
			<div className="ml-4 ">
				<p>
					<span className="font-bold">{a.author.name}</span>
					&nbsp;
					<span className="text-sm ml-2 text-gray-400">
						(@{a.author.username})
					</span>
				</p>
				<p>{a.title}</p>

				<Likes ameet={a} />
			</div>
		</div>
	));
}
