import { fetchNoError } from "../request";
import { UserInfo } from "../entity/UserInfo";
import { AvatarUrls } from "../entity/AvatarUrls";
import FileType from "../../utils/FileType";

/**
 * 获取当前用户信息
 * 
 * @return {Promise<UserInfo | undefined>}
 */ 
export async function getUserInfo(): Promise<UserInfo | undefined> {
	
	const res = await fetchNoError<UserInfo>({
		method: 'GET',
		url: "/user"
	})
	
	return res?.result?.data
}

/**
 * 通过用户名获取用户信息
 * 
 * 
 * @param {string} username 
 * @return {Promise<UserInfo | undefined>}
 */ 
export async function getUserInfoByUsername(
	username: string
): Promise<UserInfo | undefined> {
	const res = await fetchNoError<UserInfo>({
		method: 'GET',
		url: `/user/${username}`
	})
	
	return res?.result?.data
	
}

/**
 * 获取头像上传链接
 * 
 * @param {string} username 用户名
 * @param {FileType} type 	图片类型
 * @param {number} size 	图片大小（字节）
 * @return {Promise<AvatarUrls | undefined>}
 */ 
export async function getAvatarUploadUrl(
	username: string,
	type: FileType,
	size: number
): Promise<AvatarUrls | undefined> {
	const res = await fetchNoError<AvatarUrls>({
		method: 'POST',
		url: `/user/${username}/avatar`,
		header: {
			'content-type': 'application/json'
		},
		data: {
			type: type,
			size: size
		}
	})
	
	return res?.result?.data
}

/**
 * 更新用户信息
 * 
 * @param {string} username 
 * @param {{
		nickname?: string,
		bio?: string,
		profileSlug?: string
	}} info 
 * @return {Promise<UserInfo | undefined>}
 */ 
export async function updateUserInfo(
	username: string, 
	info: {
		nickname?: string,
		bio?: string,
		profileSlug?: string
	}
): Promise<UserInfo | undefined> {
	const { nickname, bio, profileSlug } = info
	
	const res = await fetchNoError<UserInfo>({
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
	})
	
	return res?.result?.data
}

