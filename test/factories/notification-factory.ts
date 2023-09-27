import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Market',
    content: new Content('You product was founded'),
    recipientId: 'recipient-2',
    ...override,
  });
}
