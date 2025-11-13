CREATE TABLE `post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`excerpt` text,
	`content` text,
	`status` text,
	`published_at` text,
	`author_id` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`nick_name` text,
	`bio` text,
	`created_at` text
);
