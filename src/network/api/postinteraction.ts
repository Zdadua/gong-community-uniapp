import type { MySort } from "../entity/MySort";
import type { PageableContent } from "../entity/pageable";
import type { PostDetail } from "../entity/post";
import { fetchNoError } from "../request";

export async function like(
	postId: number
): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "POST",
		url: `/posts/${postId}/like`
	})

	return res?.result?.data;
}

export async function dropLike(
	postId: number
): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "DELETE",
		url: `/posts/${postId}/like`
	})

	return res?.result?.data;
}

export async function getLikeStatus(
	postId: number
): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "GET",
		url: `/posts/${postId}/like/status`
	})

	return res?.result?.data;
}

export async function getLikeCount(
	postId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/posts/${postId}/like/count`
	})

	return res?.result?.data;
}

export async function getLikedPosts(
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: "/posts/liked",
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

export async function getUserLikedPosts(
	userId: number,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: `/posts/user/${userId}/liked`,
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

export async function getUserLikedPostsCount(
	userId: number
): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/posts/user/${userId}/liked/count`
	})

	return res?.result?.data;
}

// 收藏帖子
export async function favorPost(postId: number): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "POST",
		url: `/posts/${postId}/favor`
	})

	return res?.result?.data;
}

// 取消收藏帖子
export async function unfavorPost(postId: number): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "DELETE",
		url: `/posts/${postId}/favor`
	})

	return res?.result?.data;
}

// 查询帖子收藏状态
export async function getFavorStatus(postId: number): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "GET",
		url: `/posts/${postId}/favor/status`
	})

	return res?.result?.data;
}

// 获取帖子收藏数
export async function getFavorCount(postId: number): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/posts/${postId}/favor/count`
	})

	return res?.result?.data;
}

// 获取当前用户收藏的帖子
export async function getFavoredPosts(
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: "posts/favored",
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

// 获取用户收藏的帖子
export async function getUserFavoredPosts(
	userId: number,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: `posts/user/${userId}/favored`,
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})

	return res?.result?.data;
}

// 获取用户收藏帖子数量
export async function getUserFavoredPostsCount(userId: number): Promise<number | undefined> {
	const res = await fetchNoError<number>({
		method: "GET",
		url: `/posts/user/${userId}/favored/count`
	})

	return res?.result?.data;
}

// 批量点赞帖子
export async function batchLikePosts(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "POST",
		url: "/posts/batch/like",
		data: postIds
	})

	return res?.result?.data;
}

// 批量取消点赞帖子
export async function batchUnlikePosts(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "DELETE",
		url: "/posts/batch/like",
		data: postIds
	})

	return res?.result?.data;
}

// 批量查询帖子点赞状态
export async function batchGetLikeStatus(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "GET",
		url: "/posts/batch/like/status",
		data: { postIds }
	})

	return res?.result?.data;
}

// 批量收藏帖子
export async function batchFavorPosts(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "POST",
		url: "/posts/batch/favor",
		data: postIds
	})

	return res?.result?.data;
}

// 批量取消收藏帖子
export async function batchUnfavorPosts(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "DELETE",
		url: "/posts/batch/favor",
		data: postIds
	})

	return res?.result?.data;
}

// 批量查询帖子收藏状态
export async function batchGetFavorStatus(postIds: number[]): Promise<Map<number, boolean> | undefined> {
	const res = await fetchNoError<Map<number, boolean>>({
		method: "GET",
		url: "/posts/batch/favor/status",
		data: { postIds }
	})

	return res?.result?.data;
}
