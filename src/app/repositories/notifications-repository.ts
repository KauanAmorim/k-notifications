import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipipentId(recipentId: string): Promise<number>;
  abstract findManyByRecipentId(recipentId: string): Promise<Notification[]>;
}
