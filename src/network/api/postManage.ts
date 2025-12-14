import type { MySort } from "../entity/MySort";
import type { PageableContent } from "../entity/pageable";
import type { PostDetail, PostRequest } from "../entity/post";
import { fetchNoError } from "../request";

export async function getPostDraft(): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "GET",
		url: "/posts/draft"
	})
	
	return res?.result?.data;
}

export async function editPostDraft(
	draftId: number,
	request: PostRequest
): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "PUT",
		url: `/posts/draft/${draftId}`,
		data: request
	})
	
	return res?.result?.data;
}

export async function postDraft(
	draftId: number
): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "POST",
		url: `/posts/draft/${draftId}/publish`
	})
	
	return res?.result?.data;
}

export async function getPosts(
	category?: string,
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: "/posts",
		data: {
			page: page,
			size: size
		}
	})
	
	return res?.result?.data;
}

export async function postDirectly(
	request: PostRequest
): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "POST",
		url: "/posts",
		data: request
	})
	
	return res?.result?.data;
}

export async function getViralPosts(
	page: number = 0,
	size: number = 10,
	sort?: MySort
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: "/posts",
		data: {
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})
	
	return res?.result?.data;
}

export async function searchPosts(
	keyword: string,
	page: number = 0,
	size: number = 10,
	sort?: MySort
) {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: "/posts/search",
		data: {
			keyword: keyword,
			page: page,
			size: size,
			sort: sort ? `${sort.field},${sort.order}` : undefined
		}
	})
	
	return res?.result?.data;
}

export async function getPostDetail(
	postId: number
): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "GET",
		url: `/posts/${postId}`
	})
	
	return res?.result?.data;
}

export async function deletePost(postId: number): Promise<boolean | undefined> {
	const res = await fetchNoError<boolean>({
		method: "DELETE",
		url: `/posts/${postId}`
	})
	
	return res?.result?.data;
}

export async function togglePostStatus(postId: number): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "PATCH",
		url: `/posts/${postId}/toggle-status`
	})
	
	return res?.result?.data;
}

export async function postToDraft(postId: number): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "PATCH",
		url: `/posts/${postId}/to-draft`
	})
	
	return res?.result?.data;
}

export async function publishExistingPost(
	postId: number
): Promise<PostDetail | undefined> {
	const res = await fetchNoError<PostDetail>({
		method: "PATCH",
		url: `/posts/${postId}/publish`
	})
	
	return res?.result?.data;
}

export async function getPostsByUserId(
	userId: number
): Promise<PageableContent<PostDetail> | undefined> {
	const res = await fetchNoError<PageableContent<PostDetail>>({
		method: "GET",
		url: `/posts/user/${userId}`
	})
	
	return res?.result?.data;
}













