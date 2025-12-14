
export interface ReportContent {
	targetType: ReportType;
	targetId: number;
	reason: string;
	description: string;
	[property: string]: any;
}

export interface ReportInfo {
	id?: string;
	status?: ReportStatus;
	target?: {
		type?: ReportType;
		id?: number;
		title?: string;
		snippet?: string;
	};
	reason?: string;
	description?: string;
	result?: string | null;
	resultNotified?: boolean;
	resolvedAt?: string | null;
	createdAt?: string;
	updatedAt?: string;
	[property: string]: any;
}

export interface ReportResult {
	status: ReportStatus;
	result: string;
	redirectUrl?: string;
	[property: string]: any;
}

export enum ReportType {
	USER = "USER",
	POST = "POST",
	COMMENT = "COMMENT"
}

export enum ReportStatus {
	PENDING = "PENDING",
	RESOLVED = "RESOLVED",
	REJECTED = "REJECTED"
}