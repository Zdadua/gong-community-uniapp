<template>
	<view id="root-container">
		<TopBar></TopBar>
		
		<view id="post-list-container">
			<SinglePost
				:username="'zel'"
				:post-time="'12:00'"
				:content-text="'1111154654948949898798654564541351564654987987'"
				:like-count="5"
				:comment-count="5"
				:save-count="5"
				:has-liked="true"
				:has-saved="true"
			></SinglePost>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import TopBar from './TopBar.vue'
import SinglePost from '../../components/SinglePost.vue';
import { getLoginVerificationCode, getRegisterVerificationCode, getResetPasswordVerificationCode, login, loginByWeChatUniapp, registerByWechat } from '../../network/api/auth';
import { getAvatarUploadUrl, getUserInfo, getUserInfoByUsername, updateUserInfo } from '../../network/api/user';
import FileType from '../../utils/FileType';
import { setToken } from '../../storage/token';
	
	onMounted(async () => {
		const registerToken = await getRegisterVerificationCode("2814126219@qq.com")
		console.log(`email token: ${registerToken}`)
		
		const res = await wx.login()
		console.log(`wx code: ${res.code}`)
		
		// const openId = await registerByWechat(res.code, "testName", "114514", "tptptptptptp", "hello test")
		// console.log(`openId: ${openId}`)
		
		const loginToken = await getLoginVerificationCode("2814126219@qq.com")
		console.log(`login token: ${loginToken}`)
		
		const resetToken = await getResetPasswordVerificationCode("2814126219@qq.com")
		console.log(`reset token: ${resetToken}`)
		
		const loginByWechatResult = await loginByWeChatUniapp(res.code)
		console.log(`login by weChat result: ${loginByWechatResult}`)
		
		// const loginResult = await login("testName", "tptptptptptp")
		// console.log(`login result: ${loginResult.toString()}`)
		
		setToken(loginByWechatResult)
		
		const userInfo = await getUserInfo()
		console.log(userInfo)
		
		const userInfoByUsername = await getUserInfoByUsername("zelner")
		console.log(userInfoByUsername)
		
		const uploadUrl = await getAvatarUploadUrl("zelner", FileType.JPEG, 50)
		console.log(uploadUrl)
		
		const updateInfo = await updateUserInfo("zelner", {
			nickname: "adele"
		})
		console.log(updateInfo)
	})
	
</script>

<style>
	#root-container {
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(255,98,117, 0.8) 0%, #FCFCFC 13%);
		display: flex;
		flex-direction: column;
	}
	
	#post-list-container {
		width: 100%;
		flex: 1;
		
		box-sizing: border-box;
		padding: 0 24rpx;
	}
</style>
