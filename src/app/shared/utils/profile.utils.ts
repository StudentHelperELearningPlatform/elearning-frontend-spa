import { MessageService } from 'primeng/api';

/**
 * Computes initials for a given full name.
 * Falls back to 'UN' if name is empty or undefined.
 */
export function getInitials(name?: string): string {
  if (!name) return 'UN';
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.substring(0, 2).toUpperCase();
}

/**
 * Parses full name into firstName and lastName components.
 */
export function parseFullName(name?: string | null): { firstName: string; lastName: string } {
  const nameParts = (name || '').trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

/**
 * Helper to read a selected file as Data URL and notify user via MessageService.
 */
export function handleFileSelect(
  event: Event,
  messageService: MessageService,
  onLoaded: (base64: string) => void
): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const base64 = e.target?.result as string;
      onLoaded(base64);
      messageService.add({
        severity: 'info',
        summary: 'Image selected',
        detail: 'Save profile to upload the avatar.'
      });
    };
    reader.readAsDataURL(file);
  }
}
