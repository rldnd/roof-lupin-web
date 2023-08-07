export interface Holiday {
  id: string;
  name: string;
  year: string;
  month: string;
  day: string;
}

export interface MonthHoliday {
  year: string;
  month: string;
  holidays: Holiday[];
}
