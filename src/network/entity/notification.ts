
export interface Notification {
	id?: number;
	type?: NotificationType;
	priority?: NotificationPriority;
	title?: string;
	content?: string;
	redirectUrl?: string;
	sourceType?: SourceType;
	sourceId?: string;
	sourceSnippet?: string;
	context?: any;
	[property: string]: any;
}

export enum NotificationType {
	POST_COMMENTED = "POST_COMMENTED",
}

export enum SourceType {
	POST_COMMENT = "POST_COMMENT"
}

export enum NotificationPriority {
	LOW = "LOW"
}