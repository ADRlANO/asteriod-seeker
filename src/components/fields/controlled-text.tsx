import { createMemo, JSX, Show } from "solid-js";

import {
  TextField,
  TextFieldRoot,
  TextFieldLabel,
} from "~/components/ui/textfield";

type TextProps = {
  ref?: any;
  name?: string;
  label?: string;
  readOnly?: boolean;
  initialValue?: string;
  error?: string;
  class?: string;
  placeholder?: string;
  value: string | number | undefined;
  disabled?: boolean;
  type?:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "url"
    | "number"
    | "date"
    | "datetime-local";
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> | undefined;
};

export function ControlledText(props: TextProps) {
  const value = createMemo<string | number | undefined>(
    (prevValue) =>
      props.value === undefined
        ? ""
        : !Number.isNaN(props.value)
        ? props.value
        : prevValue,
    ""
  );

  return (
    <TextFieldRoot ref={props.ref}>
      <Show when={props.label}>
        <TextFieldLabel>{props.label}</TextFieldLabel>
      </Show>
      <TextField
        class={props.class}
        name={props.name}
        type={props.type ?? "text"}
        value={value()}
        onInput={props.onInput}
        disabled={props.disabled}
      />
      <Show when={props.error}>
        <input
          class="border-red-500 text-red-500 bg-transparent outline-none font-bold"
          value={props.error}
          readOnly
        />
      </Show>
    </TextFieldRoot>
  );
}
