export interface IPost {
    id: number;
    title: string;
    text: string;
    user: IUser;
    created_at: string;
}

export interface IComment {
    id: number;
    text: string;
    user: IUser;
    post: IPost;
    created_at: string;
}

export interface IUser{
    id: string;
    username: string;
    email: string;
}

