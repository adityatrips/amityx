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
			className="border border-white m-2 p-4 rounded-lg"
		>
			<div className="flex flex-1 flex-col justify-center items-center md:flex-row gap-2">
				<div className="h-full ">
					<Image
						className="rounded-full"
						src={user.user_metadata.avatar_url}
						alt="User Avatar"
						width={100}
						height={100}
					/>
				</div>
				<div className="flex flex-1 justify-between items-center gap-2">
					<input
						className="border transition-all duration-200 border-gray-900 outline:none bg-inherit outline-none focus:border w-full py-4 px-2 rounded-lg focus:border-white"
						placeholder="What is happening!?"
						type="text"
						name="title"
					/>
					<button
						className=" transition-all duration-200 bg-gray-800 text-white rounded-lg py-4 px-2 hover:bg-gray-700"
						type="submit"
					>
						Send!
					</button>
				</div>
			</div>
		</form>
	);
}
