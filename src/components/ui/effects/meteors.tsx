import { Component, For } from "solid-js";

import { cn } from "~/lib/cn/index.ts";

export const Meteors: Component<{
  number?: number;
  class?: string;
}> = (props) => {
  const number = props.number || 20;
  const meteors = Array.from({ length: number });

  return (
    <div class="absolute">
      <For each={meteors}>
        {() => (
          <span
            class={cn(
              "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[50px] before:h-px before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              props.class
            )}
            style={{
              top: "0px",
              left: `${Math.floor(Math.random() * 800 - 400)}px`,
              right: `${Math.floor(Math.random() * 800 - 400)}px`,
              "animation-delay": `${Math.random() * 0.6 + 0.2}s`,
              "animation-duration": `${Math.floor(Math.random() * 8 + 2)}s`,
            }}
          ></span>
        )}
      </For>
    </div>
  );
};
