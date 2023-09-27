import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipentId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }

  async countManyByRecipipentId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { id: recipientId },
    });
    return count;
  }

  async create(notification: Notification): Promise<void> {
    const mappedValues = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: mappedValues,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = await PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
