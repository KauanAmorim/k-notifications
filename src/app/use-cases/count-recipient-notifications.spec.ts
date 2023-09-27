import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count Recipient Notifications', () => {
  it('should be able to cancel a notification', async () => {
    const NotificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotification(
      NotificationsRepository,
    );

    const recipientId = 'recipient-1';

    await NotificationsRepository.create(
      new Notification({
        category: 'Market',
        content: new Content('You product was founded'),
        recipientId,
      }),
    );

    await NotificationsRepository.create(
      new Notification({
        category: 'Market',
        content: new Content('You product was founded'),
        recipientId,
      }),
    );

    await NotificationsRepository.create(
      new Notification({
        category: 'Market',
        content: new Content('You product was founded'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countNotification.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
