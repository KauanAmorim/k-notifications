import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  it('should be able to cancel a notification', async () => {
    const NotificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotification(
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
