'use client';

import Likes from './likes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import moment from 'moment';

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

	return (
		<div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 pb-2">
			{ameets.map((a: AmeetWithAuthor) => (
				<div
					key={a.id}
					className="border-gray-800  border-top-0 px-4 py-8 flex items-center justify-center border rounded-lg"
				>
					<div className="h-[75] w-[75]">
						<Image
							className="rounded-full"
							src={a.author.avatar_url}
							alt="User Ameet Avatar"
							width={75}
							height={75}
						/>
					</div>
					<div className="ml-4 ">
						<p>
							<span className="font-bold">{a.author.name}</span>
						</p>
						<p className="flex flex-col">
							<span className="text-sm text-gray-400">
								{moment().format('Qo MMMM YYYY, hh:mm a')}
							</span>
							<span className="text-sm text-gray-400">
								@{a.author.email.split('@')[0]}
							</span>
						</p>
						<p>{a.title}</p>

						<Likes ameet={a} />
					</div>
				</div>
			))}
		</div>
	);
}
