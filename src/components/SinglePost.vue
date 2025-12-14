<template>
	<view class="post-container">
		<view class="post-info-container">
			<!-- 头像容器 -->
			<view class="avatar-wrapper">
				
			</view>
			
			<!-- 用户名 & 发布时间 -->
			<view class="info-container">
				<text class="info-username">{{ props.postInfo.author }}</text>
				<text class="info-post-time">{{ props.postInfo.createdAt }}</text>
			</view>
		</view>
		
		<view class="post-content-container">
			<text class="post-content">{{ props.postInfo.content }}</text>
		</view>
		
		<view class="post-op-container">
			<view class="single-op-wrapper">
				<image src="/static/icons/like.svg" style="width: 32rpx; height: 32rpx;"></image>
				<text class="single-op-text">{{ like }}</text>
			</view>
			<view class="single-op-wrapper">
				<image src="/static/icons/comment.svg" style="width: 32rpx; height: 32rpx;"></image>
				<text class="single-op-text">{{ comment }}</text>
			</view>
			<view class="single-op-wrapper">
				<image src="/static/icons/save.svg" style="width: 32rpx; height: 32rpx;"></image>
				<text class="single-op-text">{{ save }}</text>
			</view>
		</view>
		
		<view class="more-btn-wrapper">
			<image src="/static/icons/more.svg" style="width: 32rpx; height: 16rpx;"></image>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { getPostCommentCount } from '@/network/api/commentmanage';
import { getFavorCount, getLikeCount } from '@/network/api/postinteraction';
import type { PostDetail } from '@/network/entity/post';
import { onMounted, ref } from 'vue';


	interface PostProps {
		postInfo: PostDetail
	}
	
	const props = defineProps<PostProps>();
	const like = ref<number>(0);
	const comment = ref(0);
	const save = ref(0);

	onMounted(async () => {
		const id = props.postInfo.id!;
		like.value = await getLikeCount(id) ?? 0;
		comment.value = await getPostCommentCount(id) ?? 0;
		save.value = await getFavorCount(id) ?? 0;
	})
	
</script>

<style lang="scss">
	
	.post-container {
		width: 100%;
		background-color: white;
		padding: 32rpx 32rpx;
		margin: 8rpx 0;
		display: flex;
		flex-direction: column;
		
		position: relative;
		
		background-color: white;
		border-radius: 24rpx;
	}
	
	.post-info-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.avatar-wrapper {
			width: 56rpx;
			height: 56rpx;
			
			border-radius: 28rpx;
			background-color: red;
			
			margin-right: 24rpx;
		}
		
		.info-container {
			display: flex;
			flex-direction: column;
			
			.info-username {
				font-size: 28rpx;
				color: black;
			}
			
			.info-post-time {
				font-size: 20rpx;
				color: #a6a6a6;
			}
		}
	}
	
	.post-content-container {
		padding: 24rpx 0;
		width: 100%;
		
		.post-content {
			display: block;
			white-space: normal;
			word-break: break-all;
			width: 100%;
			color: black;
			font-size: 28rpx;
		}
	}
	
	.post-op-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 28rpx;
		
		.single-op-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4rpx;
			
			.single-op-text {
				font-size: 24rpx;
			}
		}
	}
	
	.more-btn-wrapper {
		position: absolute;
		right: 32rpx;
		top: 32rpx;
	}

</style>