
export function setToken(token: string) {
	uni.setStorageSync("token", token);
}

export function getToken(): string {
	return uni.getStorageSync("token");
}

export function clearToken() {
	uni.setStorageSync("token", undefined);
}