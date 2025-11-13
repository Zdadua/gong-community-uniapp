<template>
	<view class="custom-topbar-wrapper">
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
	
</script>

<style lang="scss">
	
	.custom-topbar-wrapper {
		width: 100%;
		height: 44px; /* iOS 导航栏高度 */
		padding-top: var(--status-bar-height); /* 状态栏适配 */
		display: flex;
		align-items: center;
		background-color: #007aff;
		color: #fff;
		font-size: 16px;
		
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