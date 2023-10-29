'use client';
import {
	Session,
	createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function SignOutClient({
	session,
}: {
	session: Session | null;
}) {
	const router = useRouter();

	const supabase = createClientComponentClient<Database>({
		supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
	});

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return session ? (
		<button
			className="text-xs txt-gray-400"
			onClick={handleSignOut}
		>
			Logout
		</button>
	) : null;
}
