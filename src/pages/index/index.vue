<template>
	<view id="root-container">
		<TopBar></TopBar>
		
		<view id="post-list-wrapper">
			<scroll-view
				id="post-list-container"
				scroll-y="true"
				@scrolltoupper="onScrollToUpper"
				@scrolltolower="onScrollToLower"
			>
				
			</scroll-view>
		</view>

		
	</view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import TopBar from './TopBar.vue';
import { getPosts, postDirectly } from '../../network/api/postManage';
import type { PostRequest } from '../../network/entity/post';
import { login, loginByWeChatUniapp, registerByWechat } from '../../network/api/auth';

	function onScrollToUpper() {
		
	}
	
	function onScrollToLower() {
		
	}
	
	onMounted(async () => {
		const codeResult = await uni.login();
		
		console.log(codeResult.code);
		const registerResult = await registerByWechat(codeResult.code, "zelner", "zelner");
		console.log(registerResult);
		const res = await loginByWeChatUniapp(codeResult.code);
		uni.setStorageSync('token', res);
		console.log(res);

		const posts = await getPosts();

		console.log(posts);
	})
	
</script>

<style lang="scss">
	#root-container {
		width: 100%;
		height: 100vh;
		background-color: #FCFCFC;
		display: flex;
		flex-direction: column;
		
		overflow-y: hidden;
	}
	
	#post-list-wrapper {
		width: 100%;
		flex: 1;
		
		box-sizing: border-box;
		padding: 0 24rpx;
		
		#post-list-container {
			width: 100%;
			height: 100%;
		}
	}
	
	scroll-view ::-webkit-scrollbar{
	    display: none;
	    width: 0 !important;
	    height: 0 !important;
	    -webkit-appearance: none;
	    background: transparent;
	}
</style>
