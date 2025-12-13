<template>
	<scroll-view scroll-y="true">
		<view class="login-container">
			<!-- 背景图 -->
			<image class="bg-image" src="/static/svg/login-bg.svg" mode="widthFix" />

			<!-- 登录表单区域 -->
			<view class="form-card">
				<image class="card-shape" src="/static/svg/login-form-card-shape.svg" mode="widthFix" />
				<view class="card-content">
					<!-- 用户名输入框 -->
					<view class="input-wrapper">
						<input v-model="username" type="text" placeholder="请输入用户名" class="input-field"
							placeholder-style="color: #C4C4C4; font-size: 14px;" />
					</view>

					<!-- 密码输入框 -->
					<view class="input-wrapper">
						<input v-model="password" type="text" placeholder="请输入密码" :password="!showPassword"
							class="input-field password-input" placeholder-style="color: #C4C4C4; font-size: 14px;" />
						<view class="eye-icon" @click="togglePasswordVisibility">
							<image :src="eyeIcon" mode="widthFix" />
						</view>
					</view>

					<!-- 登录按钮 -->
					<button class="login-btn" :loading="isLogining" :disabled="!canLogin" @click="handleLogin">
						<text class="btn-text">登录</text>
					</button>

					<!-- 新用户注册 -->
					<view class="register-link" @click="goToRegister">
						<text>新用户注册</text>
					</view>

					<!-- 其他登录方式分隔线 -->
					<view class="divider">
						<text>其他登录方式</text>
					</view>

					<!-- 微信登录按钮 -->
					<view class="wechat-login" @click="wechatLogin">
						<image src="/static/svg/wechat-logo.svg" mode="widthFix" class="wechat-icon" />
					</view>
				</view>
			</view>
		</view>
	</scroll-view>

	<!-- 自定义 Toast 弹窗 -->
	<uni-popup ref="toastRef" type="bottom" :mask-click="false" :safe-area="false" background-color="transparent"
		mask-background-color="transparent">
		<view class="custom-toast">
			<text class="toast-text">{{ toastMessage }}</text>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref, computed } from 'vue'
import { loginByWeChatUniapp, login } from '@/network/api/auth.ts'

const username = ref('')
const password = ref('')
const showPassword = ref(false)

// 是否正在登录
const isLogining = ref(false)

const toastRef = ref(null)
const toastMessage = ref('') // Toast 内容

// 计算属性：根据 showPassword 动态返回眼睛图标
const eyeIcon = computed(() => (showPassword.value ? '/static/svg/eye-open.svg' : '/static/svg/eye-close.svg'))

// 是否可以点击登录（用于按钮禁用）
const canLogin = computed(() => {
	return username.value.trim() && password.value && !isLogining.value
})

// 切换密码可见性
const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
}

// 校验用户名
const validateUsername = (str) => {
	if (str.length < 2 || str.length > 50) return '用户名长度为2-50个字符'
	if (!/^[a-zA-Z0-9_]+$/.test(str)) return '用户名仅支持字母、数字、下划线'
	return null // 合法
}

// 校验密码
const validatePassword = (str) => {
	if (str.length < 8 || str.length > 20) return '密码长度为8-20个字符'
	return null // 合法
}

// 点击登录按钮
const handleLogin = async () => {
	if (isLogining.value) return

	const errMsgUsername = validateUsername(username.value)
	if (errMsgUsername) {
		showCustomToast(errMsgUsername)
		return
	}

	const errMsgPassword = validatePassword(password.value)
	if (errMsgPassword) {
		showCustomToast(errMsgPassword)
		return
	}

	isLogining.value = true
	try {
		// 发起登录请求
		const loginRes = await login(username.value, password.value)

		if (!loginRes) {
			// TODO: 处理报错信息
			throw new Error('');
		}
		if (!loginRes?.token) {
			throw new Error('未返回 token');
		}

		uni.setStorageSync('token', loginRes.token);

		showCustomToast('登录成功')

		setTimeout(() => {
			uni.navigateBack({ delta: 1 })
		}, 2000)
	} catch (err) {
		showCustomToast('登录失败', err.message || err)
		console.error('登录流程出错:', err)
	} finally {
		isLogining.value = false
	}
}

// 跳转注册页
const goToRegister = () => {
	uni.navigateTo({
		url: '/pages/register/register'
	})
}

const wxLogin = () => {
	return new Promise((resolve, reject) => {
		wx.login({
			success(res) {
				if (res.code) {
					resolve(res.code)
				} else {
					reject(new Error('wx.login failed: ' + (res.errMsg || 'no errMsg')))
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

// 使用微信登录
const wechatLogin = async () => {
	if (isLogining.value) return
	isLogining.value = true
	try {
		const code = await wxLogin()
		const loginRes = await loginByWeChatUniapp(code)

		if (!loginRes) {
			// TODO: 处理报错信息
			throw new Error('')
		}
		const token = loginRes
		uni.setStorageSync('token', token)
		showCustomToast('登录成功！')
		setTimeout(() => uni.navigateBack({ delta: 1 }), 2000)
	} catch (err) {
		showCustomToast('使用微信登录失败：', err.message || err.errMsg || err)
		console.error('使用微信登录失败：', err)
	} finally {
		isLogining.value = false
	}
}

// 显示自定义 Toast
const showCustomToast = (message) => {
	toastMessage.value = message
	toastRef.value.open()

	setTimeout(() => {
		toastRef.value.close()
	}, 1500)
}
</script>

<style scoped>
view,
textarea,
button,
image {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

button::after {
	border: none;
}

page {
	height: 100%;
}

scroll-view {
	height: 100vh;
}

.login-container {
	position: relative;
	min-height: 100vh;
}

.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: -1;
}

.form-card {
	position: relative;
	background: #fff;
	z-index: 10;
}

.card-shape {
	position: absolute;
	top: 502rpx;
	width: 100%;
	min-height: 800rpx;
}

.card-content {
	position: absolute;
	top: 685rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.input-wrapper {
	display: flex;
	position: relative;
	margin-bottom: 30px;
}

.input-field {
	width: 479rpx;
	height: 101rpx;
	padding: 0 19px;
	background: #FFEEF0;
	border-radius: 30px;
	font-size: 14px;
	color: #FF6C87;
}

.password-input {
	width: 420rpx;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.eye-icon {
	display: flex;
	justify-content: start;
	align-items: center;
	height: 101rpx;
	background-color: #FFEEF0;
	border-top-right-radius: 30px;
	border-bottom-right-radius: 30px;
}

.eye-icon image {
	width: 28rpx;
	height: 17rpx;
	margin-right: 31rpx;
}

.login-btn {
	margin-top: 51px;
	height: 101rpx;
	width: 395rpx;
	transition: 300ms;
	margin-bottom: 30rpx;
	background-color: #FF6C87;
	color: #FFFFFF;
	border-radius: 15px;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
}

.login-btn[disabled] {
	background-color: #EEEEEE;
	color: #979797;
}

.btn-text {
	font-size: 20px;
	letter-spacing: 0.6em;
	margin-left: 0.6em;
}

.register-link {
	text-align: center;
	color: #ec4899;
	font-size: 28rpx;
	margin-bottom: 60rpx;
}

.divider {
	text-align: center;
	font-size: 28rpx;
	color: #6b7280;
	margin: 40rpx 0;
	position: relative;
}

.wechat-login {
	display: flex;
	justify-content: center;
}

.wechat-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	padding: 10rpx;
}

.custom-toast {
	background-color: #FFA1AC;
	border-radius: 32.5px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 298rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
	background-size: 100%;
	padding: 13px 30px;
}

.toast-text {
	color: #FFFFFF;
	font-size: 16px;
	text-align: center;
}
</style>