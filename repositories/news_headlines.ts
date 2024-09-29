import { PrismaClient } from '@prisma/client';
import { NewsHeadlineCreate, NewsHeadlinePartialUpdate, NewsHeadlineUpdate } from '../models/news_headlines';

const prisma = new PrismaClient();

class NewsHeadlinesRepository {
    static async getNewsHeadlines() {
        return prisma.news_headlines.findMany({
            where: { deletedAt: null },  // Exclude soft-deleted posts
            orderBy: { createdAt: 'desc' },
        });
    }

    static async createNewsHeadline(newsHeadline: NewsHeadlineCreate) {
        return prisma.news_headlines.create({
            data: newsHeadline,
        });
    }

    static async updateNewsHeadlineById(newsHeadlineId: number, newsHeadline: NewsHeadlineUpdate) {
        return prisma.news_headlines.update({
            where: { id: newsHeadlineId },
            data: newsHeadline,
        });
    }

    static async patchNewsHeadlineById(newsHeadlineId: number, partialNewsHeadline: NewsHeadlinePartialUpdate) {
        return prisma.news_headlines.update({
            where: { id: newsHeadlineId },
            data: partialNewsHeadline,
        });
    }

    static async softDeleteNewsHeadlineById(newsHeadlineId: number) {
        return prisma.news_headlines.update({
            where: { id: newsHeadlineId },
            data: { deletedAt: new Date() },
        });
    }

    static async deleteNewsHeadlineById(newsHeadlineId: number) {
        return prisma.news_headlines.delete({
            where: { id: newsHeadlineId },
        });
    }
}

export { NewsHeadlinesRepository }
