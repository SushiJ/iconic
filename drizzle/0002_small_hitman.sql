CREATE TABLE `demo_icon` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`prompt` text(255),
	`user_id` text(255) NOT NULL,
	`createdAt` integer DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `demo_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `icon_userId_idx` ON `demo_icon` (`user_id`);