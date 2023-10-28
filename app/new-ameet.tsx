import { createServerActionClient, User } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function NewAmeet({ user }: { user: User }) {
	const addAmeet = async (formData: FormData) => {
		'use server';
		const title = formData.get('title') as string;
		const supabase = createServerActionClient<Database>(
			{
				cookies,
			},
			{
				supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
				supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
			}
		);

		await supabase.from('ameets').insert({ title, user_id: user.id });
	};

	return (
		<form
			action={addAmeet}
			className="border border-gray-800"
		>
			<div className="flex items-center py-8 px-4">
				<div className="h-12 w-12">
					<Image
						className="rounded-full"
						src={user.user_metadata.avatar_url}
						alt="User Avatar"
						width={48}
						height={48}
					/>
				</div>
				<input
					className="bg-blue-200 flex-1 bg-inherit ml-2 text-2xl leading-loose px-2"
					placeholder="What is happening!?"
					type="text"
					name="title"
				/>
				<button
					className="flex ml-2 px-4 py-2 border border-white bg-gray-800 items-center justify-center text-white text-xl rounded-xl hover:bg-white hover:text-black hover:border-gray-600"
					type="submit"
				>
					Ameet!
				</button>
			</div>
		</form>
	);
}
