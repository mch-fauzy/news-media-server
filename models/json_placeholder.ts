import { Request } from "express";

export interface JsonPlaceholderCreate {
    title: string;
    body: string;
    userId: number;
}

export interface JsonPlaceholderUpdate {
    title: string;
    body: string;
    userId: number;
}

export interface JsonPlaceholderPartialUpdate {
    title?: string;
    body?: string;
    userId?: number;
}

export interface JsonPlaceholderAddRequest extends Request {
    body: JsonPlaceholderCreate
}

export interface JsonPlaceholderEditRequest extends Request {
    body: JsonPlaceholderUpdate
}

export interface JsonPlaceholderPartialEditRequest extends Request {
    body: JsonPlaceholderPartialUpdate
}
