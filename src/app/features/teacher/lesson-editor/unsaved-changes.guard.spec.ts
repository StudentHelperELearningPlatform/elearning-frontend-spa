import { TestBed } from '@angular/core/testing';
import {
  UnsavedChangesGuarded,
  unsavedChangesGuard,
} from './unsaved-changes.guard';

const dummyRoute = {} as never;
const dummyState = {} as never;
const dummyNext = {} as never;

const runGuard = (component: UnsavedChangesGuarded) =>
  TestBed.runInInjectionContext(() =>
    unsavedChangesGuard(component, dummyRoute, dummyState, dummyNext),
  );

describe('unsavedChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when there are no unsaved changes', () => {
    const result = runGuard({ hasUnsavedChanges: () => false });
    expect(result).toBe(true);
  });

  it('prompts the user when there are unsaved changes and returns the confirm result', () => {
    const confirmSpy = vi.spyOn(globalThis, 'confirm').mockReturnValue(true);
    const result = runGuard({ hasUnsavedChanges: () => true });
    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Leave anyway?');
    expect(result).toBe(true);
  });

  it('returns false if the user declines the confirm prompt', () => {
    vi.spyOn(globalThis, 'confirm').mockReturnValue(false);
    const result = runGuard({ hasUnsavedChanges: () => true });
    expect(result).toBe(false);
  });
});
