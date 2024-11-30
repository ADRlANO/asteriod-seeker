import { Setter } from "solid-js";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: Setter<Date>;
  onEndDateChange: Setter<Date>;
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const startDate = () => props.startDate.toISOString().split("T")[0];
  const endDate = () => props.endDate.toISOString().split("T")[0];

  return (
    <div class="flex gap-4">
      <div>
        <label class="flex justify-between items-center w-full">
          Start Date
        </label>
        <input
          type="date"
          class="block rounded-md  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 w-48 border border-input"
          value={startDate()}
          onChange={(e) => props.onStartDateChange(new Date(e.target.value))}
        />
      </div>
      <div>
        <label class="flex justify-between items-center w-full">End Date</label>
        <input
          type="date"
          class="block rounded-md  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-9 w-48 border border-input"
          value={endDate()}
          onChange={(e) => props.onEndDateChange(new Date(e.target.value))}
        />
      </div>
    </div>
  );
}
