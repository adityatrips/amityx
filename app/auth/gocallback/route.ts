'use non strict';

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const supabase = createRouteHandlerClient<Database>(
		{ cookies },
		{
			supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
			supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANONKEY,
		}
	);

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}
	return NextResponse.redirect(requestUrl.origin);
}
