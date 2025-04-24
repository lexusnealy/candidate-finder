export interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string; 
}