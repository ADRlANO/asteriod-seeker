import { createSignal, createEffect } from "solid-js";

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [() => T, (value: T) => void] {
  // Retrieve stored value from localStorage, or use the initial value if none exists
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = createSignal<T>(
    storedValue !== null ? JSON.parse(storedValue) : initialValue
  );

  // Create an effect to update localStorage whenever the signal changes
  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value()));
  });

  return [value, setValue];
}
