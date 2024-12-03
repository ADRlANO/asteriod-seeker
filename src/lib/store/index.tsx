import { createSignal, createEffect } from "solid-js";

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [() => T, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = createSignal<T>(
    storedValue !== null && storedValue !== "undefined"
      ? JSON.parse(storedValue)
      : initialValue
  );

  createEffect(() => {
    const currentValue = value();
    localStorage.setItem(key, JSON.stringify(currentValue));
  });

  return [value, setValue];
}
