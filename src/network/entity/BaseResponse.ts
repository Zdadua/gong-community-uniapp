
export interface BaseResponse<T> {
	code: number;
	message: string;
	data?: T;
	timestamp?: string;
	traceId?: number;
}