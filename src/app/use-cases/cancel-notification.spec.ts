import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';
import { NotificationNotFound } from './errors/notifications-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const NotificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(NotificationsRepository);

    const notification = new Notification({
      category: 'Market',
      content: new Content('You product was founded'),
      recipientId: 'example-recipient-id',
    });

    await NotificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(NotificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
