<template>
	<scroll-view scroll-y="true">
		<view class="container">
			<!-- 背景图 -->
			<view class="bg-image-clip">
				<image class="bg-image" src="/static/svg/register-bg.svg" mode="widthFix" />
			</view>

			<!-- 主内容区域 -->
			<view class="content">
				<!-- 头像上传区域 -->
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image v-if="avatarUrl" :src="avatarUrl" class="avatar" mode="aspectFill" />
					<view v-else class="avatar-placeholder"></view>
					<image class="camera-icon" src="/static/svg/camera-icon.svg" mode="widthFix">
					</image>
				</button>

				<view class="form">
					<!-- 填写用户名 -->
					<view class="form-item">
						<text class="label">用户名</text>
						<input v-model="formData.username" class="input" placeholder="请输入用户名"
							placeholder-style="color: #C4C4C4;" type="text" />
					</view>

					<!-- 填写密码 -->
					<view class="form-item">
						<text class="label">密&#x3000;码</text>
						<input v-model="formData.password" class="input password-input" placeholder="请设置密码"
							:password="!showPassword" placeholder-style="color: #C4C4C4;" type="text" />
						<view class="eye-icon" @click="togglePasswordVisibility">
							<image :src="eyeIcon" mode="widthFix" />
						</view>
					</view>

					<!-- 填写昵称 -->
					<view class="form-item">
						<text class="label">昵&#x3000;称</text>
						<input v-model="formData.nickname" class="input" placeholder="起个昵称吧~"
							placeholder-style="color: #C4C4C4;" type="nickname" />
					</view>

					<!-- 选择性别 -->
					<view class="form-item gender">
						<text class="label">性&#x3000;别</text>
						<view class="gender-options">
							<view class="gender-option" :class="{ selected: formData.gender === 'male' }"
								@click="selectGender('male')">
								<image src="/static/svg/male.svg" mode="widthFix"></image>
								<text>男</text>
							</view>
							<view class="gender-option" :class="{ selected: formData.gender === 'female' }"
								@click="selectGender('female')">
								<image src="/static/svg/female.svg" mode="widthFix"></image>
								<text>女</text>
							</view>
							<view class="gender-option" :class="{ selected: formData.gender === 'secret' }"
								@click="selectGender('secret')">
								<image src="/static/svg/secret.svg" mode="widthFix"></image>
								<text>保密</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 注册按钮 -->
				<button class="register-btn" @click="handleRegister" :loading="isRegistering" :disabled="!canRegister">
					<text class="btn-text">注册</text>
				</button>

				<!-- 返回登录 -->
				<view class="login-link" @click="goBackToLogin">返回登录</view>
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
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { registerByWechat, login } from '@/network/api/auth.ts'
import { getAvatarUploadUrl } from '@/network/api/user.ts'

const avatarUrl = ref('')
const showPassword = ref(false)

const formData = reactive({
	username: '',
	password: '',
	nickname: '',
	gender: 'secret',
});

const isRegistering = ref(false)

const toastRef = ref(null)
const toastMessage = ref('') // Toast 内容

const eyeIcon = computed(() => (showPassword.value ? '/static/svg/eye-open.svg' : '/static/svg/eye-close.svg'))

onLoad(() => { });

// 是否可以点击注册（用于按钮禁用）
const canRegister = computed(() => {
	return formData.username.trim() && formData.password && formData.nickname.trim() && !isRegistering.value
})

const onChooseAvatar = (e) => {
	let tmpFilePath = e.detail.avatarUrl
	avatarUrl.value = tmpFilePath
};

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value
};

const selectGender = (gender) => {
	formData.gender = gender
};

// 校验用户名
const validateUsername = (str) => {
	if (!str) return '用户名不能为空'
	if (str.length < 2 || str.length > 50) return '用户名长度需为2-50个字符'
	if (!/^[a-zA-Z0-9_]+$/.test(str)) return '用户名仅支持字母、数字、下划线'
	return null // 合法
}

// 校验密码
const validatePassword = (str) => {
	if (!str) return '密码不能为空'
	if (str.length < 8 || str.length > 20) return '密码长度需为8-20个字符'
	return null // 合法
}

// 校验昵称
const validateNickname = (str) => {
	if (!str) return '昵称不能为空'
	if (str.length > 100) return '昵称长度不能大于100个字符'
	return null // 合法
}

// 校验头像
const validateAvatar = () => {
	if (!avatarUrl.value) return '请选择头像'
	return null // 合法
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
		});
	});
}

// 上传用户头像
const uploadAvatar = async () => {
	const fileManager = wx.getFileSystemManager()
	let tmpFilePath = avatarUrl.value

	const buffer = fileManager.readFileSync(tmpFilePath)
	const fileSize = buffer.byteLength
	const contentType = tmpFilePath.endsWith('.png')
		? 'image/png'
		: tmpFilePath.endsWith('.gif')
			? 'image/gif'
			: 'image/jpeg';

	// 获取头像上传预签名 URL
	const presignRes = await getAvatarUploadUrl(formData.username, contentType, fileSize)
	const presignedUrl = presignRes.uploadUrl

	// TODO: 通过预签名 URL 上传头像
}

// 点击注册按钮
const handleRegister = async () => {
	if (isRegistering.value) return

	const errMsgUsername = validateUsername(formData.username)
	if (errMsgUsername) {
		showCustomToast(errMsgUsername)
		return
	}
	const errMsgPassword = validatePassword(formData.password)
	if (errMsgPassword) {
		showCustomToast(errMsgPassword)
		return
	}

	const errMsgNickname = validateNickname(formData.nickname)
	if (errMsgNickname) {
		showCustomToast(errMsgNickname)
		return
	}

	const errMsgAvatar = validateAvatar()
	if (errMsgAvatar) {
		showCustomToast(errMsgAvatar)
		return
	}

	isRegistering.value = true
	try {
		const code = await wxLogin()

		const registerData = {
			code: code,
			username: formData.username,
			password: formData.password,
			nickname: formData.nickname,
		}

		// 发起注册请求
		const result = await registerByWechat(registerData)

		if (!result) {
			// TODO: 处理报错信息
			throw new Error('')
		}

		showCustomToast('注册成功')

		// 注册成功后，立即用注册的用户名和密码登录获取 Token
		const loginRes = await login(formData.username, formData.password)
		if (!loginRes || !loginRes.token) {
			// 如果注册成功但用注册的用户名和密码登录获取 Token 时失败，返回上一页，让用户手动登录
			console.warn('注册成功但登录失败或未返回 token')
			setTimeout(() => {
				uni.navigateBack({ delta: 1 })
			}, 2000);
			return
		}

		uni.setStorageSync('token', loginRes.token)

		// 上传头像
		await uploadAvatar()

		setTimeout(() => {
			uni.navigateBack({ delta: 2 })
		}, 2000);
	} catch (err) {
		showCustomToast('注册失败', err.message || err.errMsg || err)
		console.error('注册流程出错:', err)
	} finally {
		isRegistering.value = false
	}
};

const goBackToLogin = () => {
	uni.navigateBack({ delta: 1 });
};

// 显示自定义 Toast
const showCustomToast = (message) => {
	toastMessage.value = message
	toastRef.value.open()

	setTimeout(() => { toastRef.value.close() }, 1500)
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

.container {
	position: relative;
	min-height: 100vh;
}

.bg-image-clip {
	position: relative;
	height: 100vh;
	overflow: hidden;
}

.bg-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 300px;
	z-index: -1;
}

.content {
	position: absolute;
	top: 499rpx;
	left: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #FFFFFF;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	box-sizing: border-box;
	overflow: visible;
}

.avatar-wrapper {
	position: relative;
	width: 190rpx;
	height: 190rpx;
	margin: 0 auto;
	transform: translateY(-50%);
	background-color: transparent;
	border: none;
	z-index: 10;
}

.avatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	border: 7px solid #fff;
}

.avatar-placeholder {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #eee;
	border: 7px solid #fff;
}

.camera-icon {
	position: absolute;
	bottom: 7px;
	right: 7px;
	width: 38rpx;
	height: 38rpx;
	background-color: #ff7799;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.form {
	margin-bottom: 60rpx;
	width: 63%;
}

.form-item {
	display: flex;
	align-items: center;
	margin-bottom: 40rpx;
	position: relative;
}

.label {
	flex: 0 0 auto;
	font-size: 15px;
	color: #ff6688;
	text-align: justify;
	margin-right: 20rpx;
}

.input {
	width: 375rpx;
	height: 78rpx;
	padding: 0 19px 0 19px;
	background-color: #FFEEF0;
	border-radius: 30px;
	font-size: 14px;
	color: #FF6C87;
}

.password-input {
	width: 323rpx;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.eye-icon {
	display: flex;
	justify-content: start;
	align-items: center;
	height: 78rpx;
	background-color: #FFEEF0;
	border-top-right-radius: 30px;
	border-bottom-right-radius: 30px;
}

.eye-icon image {
	width: 28rpx;
	height: 17rpx;
	margin-right: 24rpx;
}

.gender-options {
	display: flex;
	justify-content: space-around;
	width: 100%;
}

.gender-option {
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;
}

.gender-option image {
	width: 80rpx;
	height: 80rpx;
	margin-bottom: 10rpx;
}

.gender-option text {
	font-size: 21rpx;
	color: #666;
}

.gender-option.selected text {
	height: 24rpx;
	width: 66rpx;
	border-radius: 5px;
	padding: 1px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFA1AC;
	color: #FFFFFF;
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
}

.register-btn {
	width: 395rpx;
	height: 79rpx;
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

.register-btn[disabled] {
	background-color: #EEEEEE;
	color: #979797;
}

.btn-text {
	font-size: 20px;
	letter-spacing: 0.6em;
	margin-left: 0.6em;
}

.register-btn:after {
	border: none;
}

.login-link {
	text-align: center;
	color: #FF6C87;
	font-size: 16px;
	margin-bottom: 270rpx;
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
