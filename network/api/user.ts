import request from "../request";
import { UserInfo } from "../entity/UserInfo";
import { AvatarUrls } from "../entity/AvatarUrls";
import FileType from "../../utils/FileType";

/**
 * 获取当前用户信息
 * 
 * @return {Promise<UserInfo>}
 */ 
export async function getUserInfo(): Promise<UserInfo> {
	const res = await request.fetch<UserInfo>({
		method: 'GET',
		url: "/user"
	});
	
	return res.data
}

/**
 * 通过用户名获取用户信息
 * 
 * @param {string} username 
 * @return {Promise<UserInfo>}
 */ 
export async function getUserInfoByUsername(
	username: string
): Promise<UserInfo> {
	const res = await request.fetch<UserInfo>({
		method: 'GET',
		url: "/user",
		data: {
			username: username
		}
	});
	
	return res.data
}

/**
 * 获取头像上传链接
 * 
 * @param {string} username 用户名
 * @param {FileType} type 	图片类型
 * @param {number} size 	图片大小（字节）
 * @return {Promise<AvatarUrls>}
 */ 
export async function getAvatarUploadUrl(
	username: string,
	type: FileType,
	size: number
): Promise<AvatarUrls> {
	const res = await request.fetch<AvatarUrls>({
		method: 'POST',
		url: `/user/${username}/avatar`,
		header: {
			'content-type': 'application/json'
		},
		data: {
			type: type,
			size: size
		}
	});
	
	return res.data
}

/**
 * 更新用户信息
 * 
 * @param {string} username 	用户名
 * @param {string} nickname 	昵称
 * @param {string} bio 			简介
 * @param {string} profileSlug 	个人页面地址
 * @return {Promise<UserInfo>}
 */ 
export async function updateUserInfo(
	username: string,
	nickname?: string,
	bio?: string,
	profileSlug?: string
): Promise<UserInfo> {
	const res = await request.fetch<UserInfo>({
		method: 'PATCH',
		url: `/user/${username}/profile`,
		header: {
			'content-type': 'application/json'
		},
		data: {
			nickname: nickname,
			bio: bio,
			profileSlug: profileSlug
		}
	});
	
	return res.data
}

