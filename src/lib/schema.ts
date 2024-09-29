export interface TimeSlot {
  label: string;
  value: string;
}

export interface FreeHour {
  [key: string]: string[]; // Index signature to allow any string key idk how
}

export interface HourLabel {
  [key: string]: string;
}
