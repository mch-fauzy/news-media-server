"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsHeadlinesRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class NewsHeadlinesRepository {
    static getNewsHeadlines() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.findMany({
                where: { deletedAt: null }, // Exclude soft-deleted news headlines
                orderBy: { createdAt: 'desc' },
            });
        });
    }
    static createNewsHeadline(newsHeadline) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.create({
                data: newsHeadline,
            });
        });
    }
    static updateNewsHeadlineById(newsHeadlineId, newsHeadline) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.update({
                where: { id: newsHeadlineId },
                data: newsHeadline,
            });
        });
    }
    static patchNewsHeadlineById(newsHeadlineId, partialNewsHeadline) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.update({
                where: { id: newsHeadlineId },
                data: partialNewsHeadline,
            });
        });
    }
    static softDeleteNewsHeadlineById(newsHeadlineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.update({
                where: { id: newsHeadlineId },
                data: { deletedAt: new Date() },
            });
        });
    }
    static deleteNewsHeadlineById(newsHeadlineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.news_headlines.delete({
                where: { id: newsHeadlineId },
            });
        });
    }
}
exports.NewsHeadlinesRepository = NewsHeadlinesRepository;
