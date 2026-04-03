CREATE TABLE `customers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`whatsapp` varchar(30) NOT NULL,
	`asaasCustomerId` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customers_id` PRIMARY KEY(`id`),
	CONSTRAINT `customers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`plan` enum('starter','pro','elite') NOT NULL,
	`billingType` enum('PIX','CREDIT_CARD','BOLETO') NOT NULL DEFAULT 'PIX',
	`billingCycle` enum('monthly','annual') NOT NULL DEFAULT 'monthly',
	`value` int NOT NULL,
	`status` enum('pending','active','overdue','cancelled','expired') NOT NULL DEFAULT 'pending',
	`asaasSubscriptionId` varchar(100),
	`asaasPaymentLink` text,
	`nextDueDate` bigint,
	`expirationDate` bigint,
	`briefingSessionId` varchar(100),
	`observations` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
