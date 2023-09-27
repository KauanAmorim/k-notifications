import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notifications-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const NotificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(NotificationsRepository);

    const notification = makeNotification();

    await NotificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(NotificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
