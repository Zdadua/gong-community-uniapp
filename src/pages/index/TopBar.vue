<template>
	<view class="custom-topbar-wrapper" :style="{paddingTop: `${paddingTop}px`}">
	    <view class="custom-topbar-container">
			<text>全部</text>
			<text>热门</text>
			<text>学习</text>
			<text>娱乐</text>
			<text>日常</text>
			<text>其他</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';

	const paddingTop = ref<number>(0);
	
	onBeforeMount(() => {
		let menuButtonInfo = null;
		const systemInfo = uni.getSystemInfoSync();
		
		paddingTop.value = systemInfo.statusBarHeight!;
		try {
			menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			
			paddingTop.value = paddingTop.value + menuButtonInfo.height;
		} catch(e) {
			console.log("no menuButtonInfo...");
		}
	})
	
</script>

<style lang="scss">
	
	.custom-topbar-wrapper {
		box-sizing: content-box;
		width: 100%;
		height: 44px; /* iOS 导航栏高度 */
		padding-top: var(--status-bar-height); /* 状态栏适配 */
		display: flex;
		align-items: center;
		color: #000;
		font-size: 32rpx;
		
		background: linear-gradient(to bottom, rgb(255, 118, 134) 0%, #FCFCFC 95%);
		
		.custom-topbar-container {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
		}
	}
	.back {
		padding: 0 10px;
	}
	.title {
		flex: 1;
		text-align: center;
	}
	
</style>