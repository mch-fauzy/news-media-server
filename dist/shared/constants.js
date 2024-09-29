"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHARED = void 0;
const SHARED = {
    REDIS: {
        CACHE_EXPIRY: 60 * 60, // In seconds
        NEWS_HEADLINES_KEY: 'newsHeadlines',
        EXT_JSON_PLACEHOLDER_KEY: 'extJsonPlaceholder',
        EXT_SINGLE_JSON_PLACEHOLDER_KEY: 'extSingleJsonPlaceholder'
    },
    MESSAGE: {
        SUCCESS: 'Success'
    }
};
exports.SHARED = SHARED;
