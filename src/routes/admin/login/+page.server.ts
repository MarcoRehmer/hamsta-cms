import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '');
		const password = String(data.get('password') || '');

		// Simple hard-coded credentials for demo purposes. Replace with real auth.
		if (email === 'admin@example.com' && password === 'password') {
			cookies.set('hamsta_session', '1', {
				path: '/',
				httpOnly: true,
				sameSite: 'lax'
			});

			throw redirect(303, '/admin');
		}

		return { error: 'Invalid credentials' };
	}
};
