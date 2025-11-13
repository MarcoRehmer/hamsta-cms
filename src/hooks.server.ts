import { paraglideMiddleware } from '$lib/paraglide/server';
import type { Handle } from '@sveltejs/kit';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);
	const pathname = url.pathname;

	const cookieHeader = event.request.headers.get('cookie') || '';
	const loggedIn = cookieHeader.includes('hamsta_session=');

	// Protect everything under /admin except the login page
	if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !loggedIn) {
		return new Response(null, {
			status: 303,
			headers: { location: '/admin/login' }
		});
	}

	return handleParaglide({ event, resolve });
};
