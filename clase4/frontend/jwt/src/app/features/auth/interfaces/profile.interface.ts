export interface User {
    id: number;
    username: string;
    role: string;
}


export interface ProfileResponse{
    message: string;
    user: User;
}
