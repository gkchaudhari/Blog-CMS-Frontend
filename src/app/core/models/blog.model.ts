export interface Blog {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    status: BlogStatus;
    category: string;
    coverImageUrl: string;
    slug: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface CreateBlogPayload {
    title: string;
    content: string;
    slug: string;
    category: string;
}

export interface UpdateBlogPayload extends Partial<CreateBlogPayload> {
    id: string;
}

export interface BlogResponse {
    data: Blog[];
    total: number;
    page: number;
    pageSize: number;
}

export type BlogStatus = 'draft' | 'published' | 'archived' | 'unpublished';