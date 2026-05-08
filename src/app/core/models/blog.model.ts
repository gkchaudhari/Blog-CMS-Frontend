export interface Blog {
    id: string;
    title: string;
    content: string;
    // description: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'draft' | 'published';
    category?: string;
    // tags?: string[];
    // published: boolean;
}

export interface CreateBlogPayload {
    title: string;
    content: string;
    description: string;
    category?: string;
    tags?: string[];
    published?: boolean;
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
