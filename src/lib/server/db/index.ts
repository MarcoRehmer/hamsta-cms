import { env } from '$env/dynamic/private';
import Database from 'better-sqlite3';
import crypto from 'crypto';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = new Database(env.DATABASE_URL);

export const db = drizzle(client, { schema });
export { client };

// Seed a demo user in development only
if (env.NODE_ENV !== 'production') {
	try {
		const existingUser = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.email, 'admin@example.com')
		});

		if (!existingUser) {
			const salt = crypto.randomBytes(16).toString('hex');
			const hash = crypto.scryptSync('password', salt, 64).toString('hex');
			const password_hash = `${salt}:${hash}`;

			await db.insert(schema.user).values({
				id: crypto.randomUUID(),
				email: 'admin@example.com',
				password_hash,
				first_name: 'Admin',
				last_name: 'User',
				nick_name: 'hamsta',
				bio: 'Demo admin user',
				created_at: new Date().toISOString()
			});
		}
	} catch (err) {
		// log but don't crash
		// eslint-disable-next-line no-console
		console.error('Failed to seed demo user', err);
	}
}
