import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class NewsHeadlinesRepository {
    static async getNewsHeadlines() {
        return prisma.news_headlines.findMany({
            where: { deletedAt: null },  // Exclude soft-deleted posts
            orderBy: { createdAt: 'desc' },
        });
    }

    static async createNewsHeadline(newsHeadline: Required<{ title: string, body: string, userId: number }>) {
        return prisma.news_headlines.create({
            data: newsHeadline,
        });
    }

    static async updateNewsHeadlineById(newsHeadlineId: number, newsHeadline: Required<{ title: string, body: string }>) {
        return prisma.news_headlines.update({
            where: { id: newsHeadlineId },
            data: newsHeadline,
        });
    }

    static async patchNewsHeadlineById(newsHeadlineId: number, partialNewsHeadline: Partial<{ title: string, body: string }>) {
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
