import { fetchNoError } from "../request";
import type { MediaInfo, MediaUploadResponse } from "../entity/commentMedia";

// 获取评论媒体列表
export async function getCommentMediaList(commentId: number): Promise<MediaInfo[] | undefined> {
	const res = await fetchNoError<MediaInfo[]>({
		method: "GET",
		url: `/comments/${commentId}/media`
	})

	return res?.result?.data;
}

// 上传评论媒体
export async function uploadCommentMedia(
	commentId: number,
	mediaType: string,
	fileName: string,
	fileSize: number
): Promise<MediaUploadResponse | undefined> {
	const res = await fetchNoError<MediaUploadResponse>({
		method: "POST",
		url: `/comments/${commentId}/media`,
		data: {
			type: mediaType,
			fileName: fileName,
			fileSize: fileSize
		}
	})

	return res?.result?.data;
}

// 删除评论媒体
export async function deleteCommentMedia(
	commentId: number,
	mediumId: string
): Promise<MediaInfo[] | undefined> {
	const res = await fetchNoError<MediaInfo[]>({
		method: "DELETE",
		url: `/comments/${commentId}/media/${mediumId}`
	})

	return res?.result?.data;
}
