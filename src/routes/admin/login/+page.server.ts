import { client } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import crypto from 'crypto';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();
		const password = String(data.get('password') || '');

		if (!email || !password) return { error: 'Missing email or password' };

		const row = client.prepare('SELECT id, password_hash FROM user WHERE email = ?').get(email) as
			| { id: string; password_hash: string }
			| undefined;
		if (!row) return { error: 'Invalid credentials' };

		const [salt, hash] = String(row.password_hash || '').split(':');
		if (!salt || !hash) return { error: 'Invalid credentials' };

		const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
		if (candidate !== hash) return { error: 'Invalid credentials' };

		// Successful login — set session cookie to user id
		cookies.set('hamsta_session', String(row.id), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax'
		});

		throw redirect(303, '/admin');
	}
};
