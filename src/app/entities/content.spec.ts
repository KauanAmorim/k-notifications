import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You have a new product notification');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characteres', () => {
    expect(() => new Content('test')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characteres', () => {
    expect(() => new Content('test'.repeat(200))).toThrow();
  });
});
