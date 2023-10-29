import {
	createServerActionClient,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import GoogleButton from './google-btn';
import SignUpButton from './redirect-sign-up-btn';

export const dynamic = 'force-dynamic';

export default async function Login() {
	const supabase = createServerComponentClient<Database>(
		{ cookies },
		{
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
		}
	);

	const handleSignIn = async (formData: FormData) => {
		'use server';

		const supabase = createServerActionClient<Database>(
			{
				cookies,
			},
			{
				supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
				supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
			}
		);

		await supabase.auth.signInWithPassword({
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		});
	};

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session) {
		redirect('/');
	}

	return (
		<form
		// @ts-ignore
			action={handleSignIn}
			className="flex mx-auto justify-center items-center min-w-screen min-h-screen flex-col gap-2 w-[75%]"
		>
			<input
				className="w-full py-2 bg-inherit border-b-2 border-b-[#fff] outline-none transition-all duration-200 hover:border-b-blue-400 focus:border-b-blue-400"
				placeholder="Enter your name"
				type="text"
				name="name"
			/>
			<input
				className="w-full py-2 bg-inherit border-b-2 border-b-[#fff] outline-none transition-all duration-200 hover:border-b-blue-400 focus:border-b-blue-400"
				placeholder="Enter your email address"
				type="text"
				name="email"
			/>
			<input
				className="w-full py-2 bg-inherit border-b-2 border-b-[#fff] outline-none transition-all duration-200 hover:border-b-blue-400 focus:border-b-blue-400"
				placeholder="Enter your password"
				type="password"
				name="password"
			/>
			<div className="flex flex-col w-full py-2 justify-center itmes-center gap-2">
				<div className="flex flex-row items-center justify-between">
					<button
						className="hover:bg-gray-800 rounded-xl flex justify-center items-center px-4 py-2 w-full"
						type="submit"
					>
						Login
					</button>
					<SignUpButton />
				</div>
				<GoogleButton />
			</div>
		</form>
	);
}
