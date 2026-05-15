import { BlogStatus } from "../blog.model";

export interface EditBlogForm {
    title: string;
    content: string;
    // description: string;
    // authorId: string;
    status: BlogStatus;
    category: string;
    coverImageUrl: string;
    slug: string;
};
