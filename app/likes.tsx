'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Likes({ ameet }: { ameet: AmeetWithAuthor }) {
	const router = useRouter();
	const handleLikes = async function () {
		const supabase = createClientComponentClient<Database>({
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		});
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			if (ameet.user_has_liked_ameet) {
				await supabase
					.from('likes')
					.delete()
					.match({ user_id: user.id, ameet_id: ameet.id });
			} else {
				await supabase
					.from('likes')
					.insert({ user_id: user.id, ameet_id: ameet.id });
			}
			router.refresh();
		}
	};

	return (
		<button
			className="group flex items-center"
			onClick={handleLikes}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={`transition-all duration-200  group-hover:fill-red-600 group-hover:stroke-red-600 ${
					ameet.user_has_liked_ameet
						? 'fill-red-600 stroke-red-600'
						: 'fill-none stroke-gray-500'
				}`}
			>
				<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
			</svg>
			<span
				className={`ml-2 text-sm group-hover:text-red-600 ${
					ameet.user_has_liked_ameet
						? 'text-red-600'
						: 'text-gray-500'
				}`}
			>
				{ameet.likes}
			</span>
		</button>
	);
}
