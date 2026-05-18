import { CanDeactivateFn } from '@angular/router';

export interface UnsavedChangesGuarded {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<UnsavedChangesGuarded> = (component) => {
  if (!component.hasUnsavedChanges()) return true;
  return globalThis.confirm('You have unsaved changes. Leave anyway?');
};
