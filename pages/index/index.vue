<template>
	<view class="content">
		<TopBar></TopBar>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">hello</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import TopBar from './TopBar.vue'
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
