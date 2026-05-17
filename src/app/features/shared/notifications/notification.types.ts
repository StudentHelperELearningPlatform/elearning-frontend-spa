export type NotificationType =
  | 'lesson_complete'
  | 'quiz_result'
  | 'milestone'
  | 'class_invite'
  | 'announcement'
  | 'payment';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkUrl?: string;
}
