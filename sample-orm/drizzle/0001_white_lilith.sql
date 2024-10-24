PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Students` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
INSERT INTO `__new_Students`("id", "name") SELECT "id", "name" FROM `Students`;--> statement-breakpoint
DROP TABLE `Students`;--> statement-breakpoint
ALTER TABLE `__new_Students` RENAME TO `Students`;--> statement-breakpoint
PRAGMA foreign_keys=ON;