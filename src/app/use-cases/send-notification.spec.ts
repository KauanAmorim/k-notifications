import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notifications: Notification[] = [];

const NotificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(NotificationsRepository);
    await sendNotification.execute({
      content: 'This is a notification',
      category: 'market',
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toHaveLength(1);
  });
});
