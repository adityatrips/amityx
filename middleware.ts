import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient<Database>(
		{ req, res },
		{
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		}
	);
	await supabase.auth.getSession();
	return res;
}
