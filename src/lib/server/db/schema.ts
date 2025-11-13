import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	email: text('email').notNull(),
	password_hash: text('password_hash').notNull(),
	first_name: text('first_name'),
	last_name: text('last_name'),
	nick_name: text('nick_name'),
	bio: text('bio'),
	created_at: text('created_at')
});

export const post = sqliteTable('post', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title'),
	excerpt: text('excerpt'),
	content: text('content'),
	status: text('status'),
	published_at: text('published_at'),
	author_id: text('author_id')
});
