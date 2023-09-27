import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const NotificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotifications(
      NotificationsRepository,
    );

    const recipientId = 'recipient-1';
    await NotificationsRepository.create(makeNotification({ recipientId }));
    await NotificationsRepository.create(makeNotification({ recipientId }));
    await NotificationsRepository.create(makeNotification());

    const { count } = await countNotification.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
