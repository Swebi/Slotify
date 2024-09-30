import { TimeSlot, HourLabel, FreeHour } from "@/lib/schema";

export const timeSlots: TimeSlot[] = [
  { label: "8:00 - 8:50", value: "0800" },
  { label: "8:50 - 9:40", value: "0850" },
  { label: "9:45 - 10:35", value: "0945" },
  { label: "10:40 - 11:30", value: "1040" },
  { label: "11:35 - 12:25", value: "1135" },
  { label: "12:30 - 13:20", value: "1230" },
  { label: "13:25 - 14:15", value: "1325" },
  { label: "14:20 - 15:10", value: "1420" },
  { label: "15:10 - 16:00", value: "1510" },
  { label: "16:00 - 16:50", value: "1600" },
];

export const timeHours: HourLabel = {
  "0800": "08:00 - 08:50",
  "0850": "08:50 - 09:40",
  "0945": "09:45 - 10:35",
  "1040": "10:40 - 11:30",
  "1135": "11:35 - 12:25",
  "1230": "12:30 - 13:20",
  "1325": "13:25 - 14:15",
  "1420": "14:20 - 15:10",
  "1510": "15:10 - 16:00",
  "1600": "16:00 - 16:50",
};

export const samplResponse: any = {
  "1040": ["Jake", "Terry", "Amy"],
  "1135": ["Holt"],
  "1230": [],
  "1325": ["Holt", "Rosa", "Terry"],
  "1420": ["Holt"],
  "1510": ["Terry", "Terry"],
  "1600": ["Rosa"],
  "0800": ["Jake", "Charles", "Holt", "Amy"],
  "0850": ["Jake", "Charles", "Rosa", "Amy"],
  "0945": ["Rosa", "Amy"],
};
