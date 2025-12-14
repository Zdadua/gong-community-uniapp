import { fetchNoError } from "../request";
import type { MediaInfo, MediaUploadResponse } from "../entity/commentMedia";

// 获取帖子媒体列表
export async function getPostMediaList(postId: number): Promise<MediaInfo[] | undefined> {
	const res = await fetchNoError<MediaInfo[]>({
		method: "GET",
		url: `/posts/${postId}/media`
	})

	return res?.result?.data;
}

// 上传帖子媒体
export async function uploadPostMedia(
	postId: number,
	mediaType: string,
	fileName: string,
	fileSize: number
): Promise<MediaUploadResponse | undefined> {
	const res = await fetchNoError<MediaUploadResponse>({
		method: "POST",
		url: `/posts/${postId}/media`,
		data: {
			type: mediaType,
			fileName: fileName,
			fileSize: fileSize
		}
	})

	return res?.result?.data;
}

// 删除帖子媒体
export async function deletePostMedia(
	postId: number,
	mediumId: string
): Promise<MediaInfo[] | undefined> {
	const res = await fetchNoError<MediaInfo[]>({
		method: "DELETE",
		url: `/posts/${postId}/media/${mediumId}`
	})

	return res?.result?.data;
}

// 更新帖子媒体类型
export async function updatePostMediaType(
	postId: number,
	mediumId: string,
	mediaType: string
): Promise<MediaInfo | undefined> {
	const res = await fetchNoError<MediaInfo>({
		method: "PATCH",
		url: `/posts/${postId}/media/${mediumId}`,
		data: {
			type: mediaType
		}
	})

	return res?.result?.data;
}

// 检查媒体访问权限
export async function checkMediaAccess(mediumId: string): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "GET",
		url: `/posts/media/${mediumId}/access`
	})

	return res?.result?.data;
}
