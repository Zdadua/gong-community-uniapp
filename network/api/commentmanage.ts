
import { MySort } from "../entity/MySort";
import { PageableContent } from "../entity/pageable";
import { fetchNoError } from "../request";

// 评论信息接口
export interface CommentInfo {
	id: number;
	postId: number;
	userId: number;
	username: string;
	content: string;
	parentCommentId?: number;
	likeCount: number;
	replyCount: number;
	isLiked: boolean;
	createdAt: string;
	updatedAt: string;
}

// 评论统计接口
export interface CommentStats {
	totalComments: number;
	topLevelComments: number;
}

// 发表评论
export async function createComment(
	postId: number,
	content: string,
	parentCommentId?: number
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "POST",
		url: "/comments",
		data: {
			postId: postId,
			content: content,
			parentCommentId: parentCommentId
		}
	})

	return res?.result?.data;
}

// 直接发表评论
export async function createDirectComment(
	postId: number,
	content: string,
	parentCommentId?: number
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "POST",
		url: "/comments/direct",
		data: {
			postId: postId,
			content: content,
			parentCommentId: parentCommentId
		}
	})

	return res?.result?.data;
}

// 获取评论详情
export async function getCommentDetail(
	commentId: number
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "GET",
		url: `/comments/${commentId}`
	})

	return res?.result?.data;
}

// 编辑评论
export async function updateComment(
	commentId: number,
	content: string
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "PUT",
		url: `/comments/${commentId}`,
		data: {
			content: content
		}
	})

	return res?.result?.data;
}

// 删除评论
export async function deleteComment(
	commentId: number
): Promise<any | undefined> {
	const res = await fetchNoError<any>({
		method: "DELETE",
		url: `/comments/${commentId}`
	})

	return res?.result?.data;
}

// 分页获取帖子评论
export async function getPostComments(
	postId: number,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<CommentInfo> | undefined> {
	const res = await fetchNoError<PageableContent<CommentInfo>>({
		method: "GET",
		url: `/comments/post/${postId}`,
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

// 分页获取评论回复
export async function getCommentReplies(
	commentId: number,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<CommentInfo> | undefined> {
	const res = await fetchNoError<PageableContent<CommentInfo>>({
		method: "GET",
		url: `/comments/${commentId}/replies`,
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

// 分页获取用户评论
export async function getUserComments(
	userId: number,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<CommentInfo> | undefined> {
	const res = await fetchNoError<PageableContent<CommentInfo>>({
		method: "GET",
		url: `/comments/user/${userId}`,
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

// 获取评论草稿
export async function getCommentDraft(
	postId: number,
	parentCommentId?: number
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "GET",
		url: "/comments/draft",
		data: {
			postId: postId,
			parentCommentId: parentCommentId
		}
	})

	return res?.result?.data;
}

// 编辑评论草稿
export async function updateCommentDraft(
	postId: number,
	content: string,
	parentCommentId?: number
): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "PUT",
		url: "/comments/draft",
		data: {
			postId: postId,
			content: content,
			parentCommentId: parentCommentId
		}
	})

	return res?.result?.data;
}

// 清空评论草稿
export async function clearCommentDraft(): Promise<any | undefined> {
	const res = await fetchNoError<any>({
		method: "DELETE",
		url: "/comments/draft"
	})

	return res?.result?.data;
}

// 发布评论草稿
export async function publishCommentDraft(): Promise<CommentInfo | undefined> {
	const res = await fetchNoError<CommentInfo>({
		method: "POST",
		url: "/comments/draft/publish"
	})

	return res?.result?.data;
}

// 检查评论草稿是否存在
export async function checkCommentDraftExists(): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "GET",
		url: "/comments/draft/exists"
	})

	return res?.result?.data;
}

// 点赞或取消点赞评论
export async function toggleCommentLike(
	commentId: number
): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "POST",
		url: `/comments/${commentId}/like`
	})

	return res?.result?.data;
}

// 查询评论点赞状态
export async function getCommentLikeStatus(
	commentId: number
): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "GET",
		url: `/comments/${commentId}/like/status`
	})

	return res?.result?.data;
}

// 获取评论点赞数
export async function getCommentLikeCount(
	commentId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/comments/${commentId}/like/count`
	})

	return res?.result?.data;
}

// 统计帖子评论数量
export async function getPostCommentCount(
	postId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/comments/post/${postId}/count`
	})

	return res?.result?.data;
}

// 统计帖子顶级评论数量
export async function getPostTopLevelCommentCount(
	postId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/comments/post/${postId}/count/top-level`
	})

	return res?.result?.data;
}

// 统计评论回复数量
export async function getCommentReplyCount(
	commentId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/comments/${commentId}/replies/count`
	})

	return res?.result?.data;
}

// 统计用户评论数量
export async function getUserCommentCount(
	userId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/comments/user/${userId}/count`
	})

	return res?.result?.data;
}
