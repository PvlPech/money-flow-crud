CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`parent_id` integer,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`message_id` integer,
	`amount` real NOT NULL,
	`description` text,
	`date` text DEFAULT CURRENT_DATE,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `parent_idx` ON `categories` (`parent_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `categories` (`name`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `name_unique_constraint` ON `categories` (`name`,`user_id`);--> statement-breakpoint
CREATE INDEX `date_idx` ON `expenses` (`date`,`user_id`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `expenses` (`category_id`,`user_id`);