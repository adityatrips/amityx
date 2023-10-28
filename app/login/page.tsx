import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthBtnClient from '../auth-btn-client';
import GithubButton from './github-btn';
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

	if (session) redirect('/');

	return <GithubButton />;
}
