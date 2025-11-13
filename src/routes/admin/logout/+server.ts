import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete('hamsta_session', { path: '/' });
  throw redirect(303, '/admin/login');
};
