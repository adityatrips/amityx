import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthBtnServer from './auth-btn-server';
import { redirect } from 'next/navigation';
import NewAmeet from './new-ameet';
import Ameets from './ameets';
export const dynamic = 'force-dynamic';

export default async function Home() {
	const supabase = createServerComponentClient<Database>(
		{ cookies },
		{
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		}
	);
	const {
		data: { session },
	} = await supabase.auth.getSession();
	const { data } = await supabase
		.from('ameets')
		.select('*, author: profiles(*), likes(user_id)')
		.order('created_at', { ascending: false });

	const ameet =
		data?.map((ameet) => ({
			...ameet,
			author: Array.isArray(ameet.author)
				? ameet.author[0]
				: ameet.author,
			user_has_liked_ameet: ameet.likes.find(
				(like) => like.user_id === session?.user.id
			),
			likes: ameet.likes.length,
		})) ?? [];

	if (!session) {
		redirect('/login');
	} else {
		return (
			<div className="w-full max-w-xl mx-auto">
				<div className="flex justify-between px-4 py-6 border-gray-800 border-t-0">
					<h1 className="text-xl font-bold">Home</h1>
					<AuthBtnServer />
				</div>
				<NewAmeet user={session.user} />
				{/* @ts-ignore */}
				<Ameets ameets={ameet} />
			</div>
		);
	}
}
