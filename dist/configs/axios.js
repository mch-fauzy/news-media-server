"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const axiosInstance = axios_1.default.create({
    baseURL: process.env.AXIOS_URL,
    timeout: Number(process.env.AXIOS_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
    },
});
exports.axiosInstance = axiosInstance;
