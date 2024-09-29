import { Request } from 'express';

export interface NewsHeadlineCreate {
    title: string;
    body: string;
    userId: number;
}

export interface NewsHeadlineUpdate {
    title: string;
    body: string;
}

export interface NewsHeadlinePartialUpdate {
    title?: string;
    body?: string;
}

export interface AddRequest extends Request {
    body: NewsHeadlineCreate
}

export interface EditRequest extends Request {
    body: NewsHeadlineUpdate
}

export interface PartialEditRequest extends Request {
    body: NewsHeadlinePartialUpdate
}
