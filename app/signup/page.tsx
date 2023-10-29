import {
	createServerActionClient,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginBtn from './redirect-login-btn';

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

		const { data, error } = await supabase.auth.signUp({
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			options: {
				data: {
					name: formData.get('name') as string,
					email: formData.get('email') as string,
				},
				emailRedirectTo: `${process.env.URL}/verified`,
			},
		});

		if (error) {
			console.log(error);
		} else if (data) {
			console.log(data);
		}
	};

	return (
		<form
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
			<input
				className="w-full py-2 bg-inherit border-b-2 border-b-[#fff] outline-none transition-all duration-200 hover:border-b-blue-400 focus:border-b-blue-400"
				placeholder="Enter your password"
				type="password"
				name="rep-password"
			/>
			<div className="flex flex-col w-full py-2 justify-center itmes-center gap-2">
				<div className="flex flex-row items-center justify-between">
					<button
						type="submit"
						className="hover:bg-gray-800 rounded-xl flex justify-center items-center px-4 py-2 w-full"
					>
						Sign up
					</button>
					<LoginBtn />
				</div>
			</div>
			<p className="text-sm  text-red-400">
				You will need to verify your email before you use our services.
			</p>
		</form>
	);
}
