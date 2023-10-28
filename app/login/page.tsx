import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GithubButton from './github-btn';
import GoogleButton from './google-btn';
export const dynamic = 'force-dynamic';

export default async function Login() {
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

	if (session) {
		redirect('/');
	}

	return (
		<div className="flex justify-center items-center flex-1">
			<div className="flex gap-2">
				{/* <GithubButton /> */}
				<GoogleButton />
			</div>
		</div>
	);
}
