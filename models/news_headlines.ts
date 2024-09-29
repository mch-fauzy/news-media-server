import { Request } from 'express';

export interface NewsHeadlineCreate {
    title: string;
    body: string;
    userId: number; // Ideally automatically infered from logged user except Admin which can create based on existing user
}

export interface NewsHeadlineUpdate {
    title: string;
    body: string;
}

export interface NewsHeadlinePartialUpdate {
    title?: string;
    body?: string;
}

export interface NewsHeadlineAddRequest extends Request {
    body: NewsHeadlineCreate
}

export interface NewsHeadlineEditRequest extends Request {
    body: NewsHeadlineUpdate
}

export interface NewsHeadlinePartialEditRequest extends Request {
    body: NewsHeadlinePartialUpdate
}
