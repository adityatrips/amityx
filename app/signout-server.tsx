import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignoutClient from './signout-client';

export const dynamic = 'force-dynamic';

export default async function SignOutServer() {
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

	return <SignoutClient session={session} />;
}
