import { VerificationCode } from "../entity/VerificationCode";
import { RegisterEmail } from "../entity/RegisterEmail";
import request from "../request";
import { SimpleUserInfo } from "../entity/SimpleUserInfo";
import { Verification } from "../entity/Verification";
import { UniappRegisterOpenId } from "../entity/UniappRegisterOpenId";
import { LoginResponse } from "../entity/LoginResponse";
import { ResetPasswordResponse } from "../entity/ResetPasswordResponse";

/**
 * 获取邮箱注册验证码
 * 
 * @param {string} email 
 * @return {string} token
 */ 
export async function getRegisterVerificationCode(email: string): Promise<string> {
	const res = await request.fetch<VerificationCode>({
		method: 'POST',
		url: "/auth/register/send-code",
		data: {
			email: email
		}
	});
	
	return res.data.token
}

/**
 * 获取邮箱登录验证码
 * 
 * @param {string} email 
 * @return {string} token
 */ 
export async function getLoginVerificationCode(email: string): Promise<string> {
	const res = await request.fetch<VerificationCode>({
		method: 'POST',
		url: "/auth/login/send-code",
		data: {
			email: email
		}
	});
	 
	return res.data.token
}

/**
 * 获取重置密码验证码
 * 
 * @param {string} email 
 * @return {string} token
 */ 
export async function getResetPasswordVerificationCode(email: string): Promise<string> {
	const res = await request.fetch<VerificationCode>({
		method: 'POST',
		url: "/auth/reset-password/send-code",
		data: {
			email: email
		}
	});
	
	return res.data.token
}

/**
 * 用户注册
 * 
 * @param {SimpleUserInfo} userInfo 
 * @param {Verification} verification 
 * @return {string} 邮箱
 */ 
export async function register(
	userInfo: SimpleUserInfo,
	verification: Verification
): Promise<string> {
	const res = await request.fetch<RegisterEmail>({
		method: 'POST',
		url: "/auth/register",
		header: {
			'content-type': 'application/json'
		},
		data: {
			user: userInfo,
			verification: verification
		}
	});
	
	return res.data.email
}

/**
 * 微信小程序注册
 * 
 * @param {SimpleUserInfo} userInfo 
 * @return {string} openId
 */ 
export async function uniappRegister(
	userInfo: SimpleUserInfo
): Promise<string> {
	const res = await request.fetch<UniappRegisterOpenId>({
		method: 'POST',
		url: "/auth/register/wechat",
		header: {
			'content-type': 'application/json'
		},
		data: userInfo
	});
	
	return res.data.openId
}

/**
 * 账号密码登录
 * 
 * @param {string} username 
 * @param {string} password 
 * @return {Promise<LoginResponse>}
 */ 
export async function login(
	username: string,
	password: string
): Promise<LoginResponse> {
	const res = await request.fetch<LoginResponse>({
		method: 'POST',
		url: "/auth/login",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			username: username,
			password: password
		}
	});
	
	return res.data
}

/**
 * 邮箱验证码登录
 * 
 * @param {Verification} verification 
 * @return {Promise<LoginResponse>}
 */ 
export async function loginByEmailVerificationCode(
	verification: Verification
): Promise<LoginResponse> {
	const res = await request.fetch<LoginResponse>({
		method: 'POST',
		url: "/auth/login-with-code",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: verification
	});
	
	return res.data
}

/**
 * 微信小程序登录
 * 
 * @param {string} code 
 * @return {Promise<LoginResponse>}
 */ 
export async function loginByWeChatUniapp(
	code: string
): Promise<LoginResponse> {
	const res = await request.fetch<LoginResponse>({
		method: 'POST',
		url: "/auth/login-with-wechat",
		header: {
		    'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			code: code
		}
	});
	
	return res.data
}

/**
 * 重置密码
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {Verification} verification 
 * @return {Promise<boolean>} 是否成功
 */ 
export async function resetPassword(
	email: string,
	password: string,
	verification: Verification
): Promise<boolean> {
	const res = await request.fetch<ResetPasswordResponse>({
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
	});
	
	return res.data.success
}


