
// 媒体信息接口
export interface MediaInfo {
	id: string;
	type: string;
	url: string;
	thumbnailUrl?: string;
	fileName: string;
	fileSize: number;
	createdAt: string;
}

// 媒体上传响应接口
export interface MediaUploadResponse {
	uploadUrl: string;
	accessUrl: string;
	mediaId: string;
}