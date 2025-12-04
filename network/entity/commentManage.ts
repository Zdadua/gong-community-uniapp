
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