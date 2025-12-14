
export interface PostRequest {
    /**
     * 帖子分类
     */
    category?: string | null;
    /**
     * 帖子正文内容（可为空表示继续保留原内容）
     */
    content?: string;
    /**
     * 帖子标题
     */
    title: string;
    [property: string]: any;
}

/**
 * PostDetail, 帖子详细信息
 */
export interface PostDetail {
    author?: PostAuthor;
    category?: string;
    content?: string;
    createdAt?: Date;
    id?: number;
    media?: Medium[];
    possiblySensitive?: boolean;
    status?: DataStatus;
    title?: string;
    updatedAt?: Date;
    [property: string]: any;
}

/**
 * PostAuthor, 帖子作者信息
 */
export interface PostAuthor {
    avatarUrl?: string;
    bio?: string;
    createdAt?: Date;
    id?: number;
    nickname?: string;
    profileSlug?: string;
    role?: Role;
    status?: AuthorStatus;
    updatedAt?: Date;
    username?: string;
    verifiedId?: number | null;
    [property: string]: any;
}

export enum Role {
    Admin = "ADMIN",
    Moderator = "MODERATOR",
    User = "USER",
}

export enum AuthorStatus {
    Active = "Active",
    Banned = "Banned",
    Inactive = "Inactive",
}

/**
 * Medium, 媒体资源信息
 */
export interface Medium {
    /**
     * 用于前端展示的访问地址
     */
    displayUrl?: string;
    id?: string;
    /**
     * 资源真实访问地址
     */
    resourceUrl?: string;
    /**
     * 媒体类型，如image/video/cover等
     */
    type?: string;
    [property: string]: any;
}

export enum DataStatus {
    Draft = "DRAFT",
    Published = "PUBLISHED",
    Suspended = "SUSPENDED",
    UnderReview = "UNDER_REVIEW",
}