export interface Holiday {
  id: string;
  name: string;
  year: number;
  month: number;
  day: number;
}

export interface MonthHoliday {
  year: number;
  month: number;
  holidays: Holiday[];
}
