import type { BaseResponse } from "../network/entity/BaseResponse";

export interface Success<T> {
	result?: BaseResponse<T>;
	statusCode: number;
	header?: any;
}

export interface HttpError {
	statusCode: number;
	errMsg: string;
}

export interface ErrorData {
	code: number;
	message: string;
	timestamp: number;
	traceId: string;
}