# TODO / Notes (updated: 2025-11-13)

## Summary of recent changes

- Styled the admin login page: `src/routes/admin/login/+page.svelte` (basic responsive UI).
- Added a server action for login: `src/routes/admin/login/+page.server.ts` (demo credentials).
- Added a route guard in `src/hooks.server.ts` to redirect unauthenticated users under `/admin` to `/admin/login` while preserving `paraglide` middleware.

## How to test

- Start dev server:

```bash
npm run dev
```

- Visit the admin route (protected): `http://localhost:5173/admin` — you should be redirected to `/admin/login` if not authenticated.
- Visit the login page: `http://localhost:5173/admin/login`

- Demo credentials (for local testing only):
  - Email: `admin@example.com`
  - Password: `password`

## Notes / Security

- The current auth is demo-only and uses hard-coded credentials.
- Session is represented by a simple cookie `hamsta_session=1`.
- Do NOT use this in production. Suggested improvements:
  - Replace with a proper user store (database) and hashed passwords.
  - Use secure cookies in production (`secure: true`, `httpOnly: true`, add expiry/renewal).
  - Consider using `event.locals` on the server and a session store / JWTs for robust session management.

## Next steps (suggested)

- [ ] Add a logout endpoint (`/admin/logout`) that clears the `hamsta_session` cookie and redirects to `/admin/login`.
- [ ] Replace the demo auth with an integration to a real auth provider (Auth0, Clerk, Supabase Auth, or custom DB + bcrypt).
- [ ] Move the login styles to a shared stylesheet or Svelte component for reuse.
- [ ] Add role-based access checks if the admin area requires different permissions.

## Question: "Enable Claude Haiku 4.5 for all clients"

I need clarification about what "Enable Claude Haiku 4.5 for all clients" means for this project. Options and what I need from you:

- Is this an external API or service setting (Anthropic / Claude or some internal tool)? If so, provide the service name, where the setting is changed (dashboard, API, infrastructure-as-code repo), and any credentials or API details you want me to use.
- Do you want a feature-flag in this app to toggle a capability named "Claude Haiku 4.5" for clients? If yes, say whether to store that flag in code (config file), environment variables, or a database, and I'll implement a toggle UI + server-side check.

## Tasks you can ask me to do next

- Implement the `/admin/logout` endpoint and add a logout button on the admin page.
- Replace the demo auth with a chosen provider (I can prepare an integration for Supabase/Auth0/etc.).
- Add a feature-flag and admin UI to enable "Claude Haiku 4.5" for all or selected clients — specify storage and desired behavior.

If you'd like, I can implement the logout endpoint next. Which of the next steps should I take?
