import { Database as DB } from '@/lib/database.types';

type Ameet = DB['public']['Tables']['ameets']['Row'];
type Profile = DB['public']['Tables']['profiles']['Row'];

declare global {
	type Database = DB;
	type AmeetWithAuthor = Ameet & {
		author: Profile;
		likes: number;
		user_has_liked_ameet: boolean;
	};
}
