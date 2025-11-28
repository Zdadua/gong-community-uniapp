import { VerificationCode } from "../entity/VerificationCode";
import { RegisterEmail } from "../entity/RegisterEmail";
import { fetchNoError } from "../request";
import { SimpleUserInfo } from "../entity/SimpleUserInfo";
import { Verification } from "../entity/Verification";
import { UniappRegisterOpenId } from "../entity/UniappRegisterOpenId";
import { LoginResponse } from "../entity/LoginResponse";
import { ResetPasswordResponse } from "../entity/ResetPasswordResponse";

/**
 * 获取邮箱注册验证码
 * 
 * @param {string} email 
 * @return {Promise<string | undefined>} token
 */ 
export async function getRegisterVerificationCode(email: string): Promise<string | undefined> {
	const res = await fetchNoError<VerificationCode>({
		method: 'POST',
		url: "/auth/register/send-code",
		data: {
			email: email
		}
	})
	
	return res?.result?.data?.token
}

/**
 * 获取邮箱登录验证码
 * 
 * @param {string} email 
 * @return {Promise<string | undefined>} token
 */ 
export async function getLoginVerificationCode(email: string): Promise<string | undefined> {
	const res = await fetchNoError<VerificationCode>({
		method: 'POST',
		url: "/auth/login/send-code",
		data: {
			email: email
		}
	})
	 
	return res?.result?.data?.token
}

/**
 * 获取重置密码验证码
 * 
 * @param {string} email 
 * @return {Promise<string | undefined>} token
 */ 
export async function getResetPasswordVerificationCode(email: string): Promise<string | undefined> {
	const res = await fetchNoError<VerificationCode>({
		method: 'POST',
		url: "/auth/reset-password/send-code",
		data: {
			email: email
		}
	})
	
	return res?.result?.data?.token
}

/**
 * 通过邮箱注册
 * 
 * @param {SimpleUserInfo} userInfo 
 * @param {string} email 
 * @param {string} token 
 * @param {string} credential 
 * @return {Promise<string | undefined>} 邮箱
 */ 
export async function registerByEmail(
	userInfo: SimpleUserInfo, 
	email: string,
	token: string,
	credential: string
): Promise<string | undefined> {
	const res = await fetchNoError<RegisterEmail>({
		method: 'POST',
		url: "/auth/register",
		header: {
			'content-type': 'application/json'
		},
		data: {
			user: userInfo,
			verification: {
				principle: email,
				token: token,
				scope: "register",
				credential: credential
			}
		}
	})
	
	return res?.result?.data?.email
}

/**
 * 通过微信注册
 * 
 * @param {string} code 
 * @param {string} username 
 * @param {string} password 
 * @param {string} nickname 
 * @param {string} bio 
 * @return {Promise<string | undefined>} openId
 */ 
export async function registerByWechat(
	code: string,
	username: string,
	password: string,
	nickname?: string,
	bio?: string
): Promise<string | undefined> {
	const res = await fetchNoError<UniappRegisterOpenId>({
		method: 'POST',
		url: "/auth/register/wechat",
		header: {
			'content-type': 'application/json'
		},
		data: {
			code: code,
			username: username,
			password: password,
			nickname: nickname,
			bio: bio
		}
	})
	
	console.log(res)
	
	return res?.result?.data?.openId
}

/**
 * 账号密码登录
 * 
 * @param {string} username 
 * @param {string} password 
 * @return {Promise<LoginResponse | undefined>}
 */ 
export async function login(
	username: string,
	password: string
): Promise<LoginResponse | undefined> {
	const res = await fetchNoError<LoginResponse>({
		method: 'POST',
		url: "/auth/login",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			username: username,
			password: password
		}
	})
	
	return res?.result?.data
}

/**
 * 邮箱验证码登录
 * 
 * @param {Verification} verification 
 * @return {Promise<LoginResponse | undefined>}
 */ 
export async function loginByEmailVerificationCode(
	verification: Verification
): Promise<LoginResponse | undefined> {
	const res = await fetchNoError<LoginResponse>({
		method: 'POST',
		url: "/auth/login-with-code",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: verification,
	})
	
	return res?.result?.data
}

/**
 * 微信小程序登录
 * 
 * @param {string} code 
 * @return {Promise<string | undefined>}
 */ 
export async function loginByWeChatUniapp(
	code: string
): Promise<string | undefined> {
	const res = await fetchNoError<LoginResponse>({
		method: 'POST',
		url: "/auth/login-with-wechat",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			code: code
		}
	})
	
	return res?.header['Authorization'] || res?.header['authorization']
}

/**
 * 重置密码
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {Verification} verification 
 * @return {Promise<boolean | undefined>} 是否成功
 */ 
export async function resetPassword(
	email: string,
	password: string,
	verification: Verification
): Promise<boolean | undefined> {
	const res = await fetchNoError<ResetPasswordResponse>({
		method: 'POST',
		url: "/auth/reset-password",
		header: {
		    'content-type': 'application/json'
		},
		data: {
			email: email,
			password: password,
			verification: verification
		}
	})
	
	return res?.result?.data?.success
}

/**
 * 微信登录
 * 
 * @return 
 */ 
export function uniLogin() {
	
	return new Promise((resolve, reject) => {
		uni.login({
			provider: "weixin",
			success: (res) => {
				const code = res.code;
				resolve(code);
			},
			fail: reject
		})
	})
}


