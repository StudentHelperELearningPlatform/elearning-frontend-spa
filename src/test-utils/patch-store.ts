import { patchState, WritableStateSource } from '@ngrx/signals';

/**
 * Wrapper around patchState for use in specs.
 *
 * In @ngrx/signals v21 the injected store type is inferred as read-only
 * (signals are Signal<T> not WritableSignal<T>), so calling patchState()
 * directly on it fails the TypeScript compiler even though it works at runtime.
 * This helper casts to WritableStateSource so specs compile cleanly.
 */
export function patchStore<State extends object>(store: unknown, patch: Partial<State>): void {
  patchState(store as WritableStateSource<State>, patch);
}
