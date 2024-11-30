import { Show, For } from "solid-js";
import { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

type SelectProps<T> = {
  label?: string;
  options: Array<T>;
  value: T;
  valueKey: keyof T;
  labelKey: keyof T;
  onChange: (value: T) => void;
};

export function ControlledSelect<T>(props: SelectProps<T>) {
  const label = () =>
    String(props.labelKey ? props.value[props.labelKey] : props.value);

  return (
    <div>
      <Show when={props.label}>
        <label class="flex justify-between items-center w-full">
          {props.label}
        </label>
      </Show>
      <DropdownMenu placement="bottom">
        <DropdownMenuTrigger
          as={(dropdownTriggerProps: DropdownMenuSubTriggerProps) => {
            return (
              <Button
                class="text-black w-56"
                variant="outline"
                {...dropdownTriggerProps}
              >
                {label()}
              </Button>
            );
          }}
        />
        <DropdownMenuContent class="w-48">
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <For each={props.options}>
              {(selectedOption) => (
                <DropdownMenuItem
                  class="flex justify-center"
                  onClick={() => props.onChange(selectedOption)}
                >
                  {selectedOption[props.labelKey]}
                </DropdownMenuItem>
              )}
            </For>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
