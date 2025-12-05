<!--
	举报页面

	路由路径：/pages/report/report

	跳转时需要传入
		- type    {string}  必填。举报对象类型，可选值：'USER'（用户）、'POST'（帖子）、'COMMENT'（评论）
    	- id      {number}  必填。被举报对象的 ID
    	- content {string}  可选。被举报内容的原文（用于给用户展示）

	使用示例：
	uni.navigateTo({
		url: '/pages/report/report?type=POST&id=123456&content=点击链接免费领【AWP（纪念品）| 巨龙传说（崭新出厂）】！开箱100%出金'
	}) 
-->
<template>
	<scroll-view scroll-y="true">
		<view class="content">
			<view class="report-main">
				<view class="report-card">
					<view class="form-row">
						<text class="section-title">举报内容：</text>
						<textarea maxlength="-1" disabled="true" placeholder-style="color:#A6A6A6"
							:placeholder="targetContent" />
					</view>
					<view class="form-row center-align">
						<text class="section-title required">举报原因：</text>
						<view class="report-reason open-report-reason-selector"
							:class="{ active: reportReason, 'error-border': !reportReason && isShowReasonButtonErrorBorder }"
							@click="openReportReasonSelector">
							{{ reportReason || '点击选择' }}
						</view>
					</view>
					<view class="form-row">
						<text class="section-title">举报描述：</text>
						<textarea class="report-description-textarea" maxlength="-1" placeholder-style="color:#A6A6A6"
							placeholder="填写的越详细越利于举报快速解决哦～" v-model="reportDescription" />
					</view>
				</view>
				<text class="disclaimer">请确定该信息违规，如果恶意举报将导致您的账号功能受限。</text>
			</view>

			<button class="submit-report" :disabled="!reportReason && !reportDescription.trim()"
				@click="submitReport">提交举报</button>

		</view>
	</scroll-view>

	<!-- 选择举报原因（举报类型） -->
	<uni-popup ref="reportReasonPopupRef" type="bottom" :safe-area="false">
		<view class="report-reason-popup-content">
			<view class="report-reasons">
				<view v-for="reason in reasons" :key="reason" class="report-reason"
					:class="{ active: reportReason === reason }" @click="selectReportReason(reason)">
					{{ reason }}
				</view>
			</view>
			<button class="cancel-button" @click="closeReportReasonSelector()">取消</button>
		</view>
	</uni-popup>

	<!-- 确认举报弹窗 -->
	<uni-popup ref="confirmPopupRef" type="center">
		<view class="confirm-dialog">
			<text class="confirm-title">再次确认是否举报？</text>
			<view class="confirm-buttons">
				<button class="confirm-cancel" @click="cancelReport">取消</button>
				<button class="confirm-submit" @click="confirmSubmitReport">确认</button>
			</view>
		</view>
	</uni-popup>

	<!-- 自定义 Toast 弹窗 -->
	<uni-popup ref="toastRef" type="bottom" :mask-click="false" :safe-area="false" background-color="transparent"
		mask-background-color="transparent">
		<view class="custom-toast">
			<text class="toast-text">{{ toastMessage }}</text>
		</view>
	</uni-popup>
</template>

<script setup>
import {
	ref
} from 'vue'
import {
	onLoad
} from '@dcloudio/uni-app'
import {
	commitReport
} from '@/network/api/report.ts'

const reasons = [
	'色情低俗',
	'广告营销',
	'暴力恐怖',
	'政治敏感',
	'引战网暴',
	'涉嫌诈骗',
	'传播谣言',
	'其他'
]

const targetContent = ref('') // 被举报的内容
const targetId = ref(null) // 举报对象 ID
const targetType = ref('') // 举报对象类型

const reportReason = ref('') // 举报原因
const reportDescription = ref('') // 举报描述

const isShowReasonButtonErrorBorder = ref(false) // 是否为选择举报原因按钮加上强调边框

const reportReasonPopupRef = ref(null)
const confirmPopupRef = ref(null)
const toastRef = ref(null)
const toastMessage = ref('') // Toast 内容

onLoad((option) => {
	const id = Number(option.id)
	targetId.value = id
	targetType.value = option.type
	targetContent.value = option.content || ''
})

// 点击“提交举报”按钮
const submitReport = () => {
	if (reportReason.value === '') {
		showCustomToast('未填写举报原因')
		isShowReasonButtonErrorBorder.value = true
		return
	}
	confirmPopupRef.value.open()
}

// 取消举报
const cancelReport = () => {
	confirmPopupRef.value.close()
}

// 确认举报（真正提交）
const confirmSubmitReport = async () => {
	confirmPopupRef.value.close()

	const reportData = {
		targetType: targetType.value,
		targetId: targetId.value,
		reason: reportReason.value,
		description: reportDescription.value,
	}

	const result = await commitReport(reportData);

	if (result) {
		showCustomToast('举报成功');
		setTimeout(() => {
			uni.navigateBack({
				delta: 1
			});
		}, 2000);
	} else {
		showCustomToast('举报失败');
	}
}

// 关闭举报原因选择器
const closeReportReasonSelector = () => {
	// 重置状态
	reportReason.value = ''
	reportReasonPopupRef.value.close()
}

// 打开举报原因选择器
const openReportReasonSelector = () => {
	reportReasonPopupRef.value.open()
}

// 选择一项作为举报原因
const selectReportReason = (reason) => {
	reportReason.value = reason
	reportReasonPopupRef.value.close()
}

// 显示自定义 Toast
const showCustomToast = (message = '举报成功') => {
	toastMessage.value = message
	toastRef.value.open()

	setTimeout(() => {
		toastRef.value.close()
	}, 1500)
}
</script>

<style>
view,
textarea,
button {
	box-sizing: border-box;
}

/* 去除 Button 自带的 border */
button::after {
	border: none;
}

page {
	height: 100%;
}

scroll-view {
	height: 100vh;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	min-height: 100vh;
}

.report-main {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.report-card {
	width: 700rpx;
	border-radius: 15px;
	padding: 20px 20px 89px 0px;
	margin: 20px 16px 20px 16px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
	display: flex;
	flex-direction: column;
	row-gap: 19px;
}

.form-row {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	width: 100%;
}

.section-title {
	flex: 0 0 auto;
	text-align: right;
	padding-left: 8px;
	margin-top: 8px;
	font-weight: 500;
	font-size: 16px;
	white-space: nowrap;
}

.form-row.center-align {
	align-items: center;
}

.form-row.center-align .section-title {
	margin-top: 0;
}

.required {
	position: relative;
}

.required::before {
	content: "*";
	color: #FF6275;
	position: absolute;
	left: 0;
	top: 0;
}

textarea {
	padding: 9px 8px 12px 8px;
	width: 494rpx;
	height: 218rpx;
	background-color: #EEEEEE;
	border-radius: 10px;
	font-size: 14px;
}

.report-main .report-reason {
	background-color: #EEEEEE;
	text-align: center;
}

.open-report-reason-selector.error-border {
	border: 1px solid #FF6C87;
}

.disclaimer {
	color: #A6A6A6;
	text-align: center;
	font-size: 12px;
	width: 100%;
	max-width: 686rpx;
}

.report-description-textarea {
	color: #3A3A3A;
	font-size: 14px;
}

button.submit-report {
	width: 195rpx;
	height: 87rpx;
	margin-top: 20px;
	margin-bottom: 40px;
	border-radius: 10px;
	border-color: #A6A6A6;
	background-color: #FF6C87;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	color: #FFFFFF;
}

button.submit-report[disabled] {
	background-color: #EEEEEE;
	color: #A6A6A6;
}

.report-reason-popup-content {
	padding: 0 15px 0 15px;
	height: 55vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	border-radius: 10px;
	background-color: #fff;
}

.report-reasons {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-self: self-start;
	align-items: center;
	align-content: center;
	row-gap: 20px;
}

.report-reason {
	width: 181rpx;
	height: 66rpx;
	border-radius: 10px;
	border-color: #F5F5F5;
	background-color: #F5F5F5;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 400;
	color: #A6A6A6;
}

.report-reason.active {
	background-color: rgba(255, 98, 117, 0.2);
	color: #FF6C87;
}

.report-reasons::after {
	content: "";
	width: 181rpx;
}

.cancel-button {
	margin-top: 60px;
	width: 195rpx;
	height: 87rpx;
	border-radius: 10px;
	border-color: #FF6C87;
	background-color: #FF6C87;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	color: #FFFFFF;
}

/* 确认举报弹窗 */
.confirm-dialog {
	padding: 23px 25px 15px 25px;
	background: #FFFFFF;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 38px;
}

.confirm-title {
	font-size: 20px;
	font-weight: 400;
	color: #3A3A3A;
}

.confirm-buttons {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	column-gap: 38px;
}

.confirm-cancel,
.confirm-submit {
	height: 84rpx;
	width: 208rpx;
	border-radius: 10px;
	font-size: 16px;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
}

/* 取消按钮 */
.confirm-cancel {
	background-color: #EEEEEE;
	color: #3A3A3A;
}

/* 确认按钮 */
.confirm-submit {
	background-color: #FFA1AC;
	color: #FFFFFF;
}

.custom-toast {
	width: 248rpx;
	height: 84rpx;
	background-color: #FFA1AC;
	border-radius: 32.5px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 280rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
	background-size: 100%;
}

.toast-text {
	color: #FFFFFF;
	font-size: 16px;
	text-align: center;
}
</style>