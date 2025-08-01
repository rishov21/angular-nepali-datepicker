export interface DateObject { year: number; month: number; day: number; value: string; }

export interface NepaliFunctions {
  AD: {
    /** Returns the current AD date as NepaliDate or formatted string */
    GetCurrentDate(dateFormat?: string): DateObject;
    
    /** Returns the current day of month in AD */
    GetCurrentDay(): number;
    
    /** Returns the current month (1-12) in AD */
    GetCurrentMonth(): number;
    
    /** Returns the current year in AD */
    GetCurrentYear(): number;
    
    /** Returns number of days between two AD dates */
    DatesDiff(startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string): number;
    
    /** Returns the weekday name for the given AD day index */
    GetDay(dayIndex: number): string | null;
    
    /** Returns array of weekday names in AD */
    GetDays(): string[];
    
    /** Returns number of days in the given AD year and month */
    GetDaysInMonth(year: number, month: number): number;
    
    /** Returns the short weekday name for the given AD day index */
    GetDayShort(dayIndex: number): string | null;
    
    /** Returns array of abbreviated weekday names in AD */
    GetDaysShort(): string[];
    
    /** Returns the full date string for the given AD date */
    GetFullDate(adDate: DateObject | string, dateFormat?: string): string;
    
    /** Returns the weekday name for the given AD date */
    GetFullDay(adDate: DateObject | string, dateFormat?: string): string;
    
    /** Returns the month name for the given AD month index */
    GetMonth(monthIndex: number): string | null;
    
    /** Returns array of month names in AD */
    GetMonths(): string[];
  };
  
  BS: {
    /** Returns the current BS date as NepaliDate or formatted string */
    GetCurrentDate(dateFormat?: string): DateObject;
    
    /** Returns the current day of month in BS */
    GetCurrentDay(): number;
    
    /** Returns the current month (1-12) in BS */
    GetCurrentMonth(): number;
    
    /** Returns the current year in BS */
    GetCurrentYear(): number;
    
    /** Returns a BS date after adding given number of days */
    AddDays(bsDate: DateObject | string, noOfDays: number, dateFormat?: string): DateObject | string;
    
    /** Returns number of days between two BS dates */
    DatesDiff(startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string): number;
    
    /** Returns the Nepali unicode weekday name for the given BS day index */
    GetDayInUnicode(dayIndex: number): string | null;
    
    /** Returns array of Nepali unicode weekday names (short) */
    GetDaysInUnicodeShort(): string[];
    
    /** Returns number of days in the given BS year and month */
    GetDaysInMonth(year: number, month: number): number;
    
    /** Returns array of Nepali unicode weekday names */
    GetDaysInUnicode(): string[];
    
    /** Returns the Nepali unicode weekday (short) for the given BS day index */
    GetDayInUnicodeShort(dayIndex: number): string | null;
    
    /** Returns the full date string for the given BS date (in English or Nepali) */
    GetFullDate(bsDate: DateObject | string, unicode: boolean, dateFormat?: string): string;
    
    /** Returns the weekday name for the given BS date (English) */
    GetFullDay(bsDate: DateObject | string, dateFormat?: string): string;
    
    /** Returns the weekday name for the given BS date (Nepali unicode) */
    GetFullDayInUnicode(bsDate: DateObject | string, dateFormat?: string): string;
    
    /** Returns the month name for the given BS month index (English) */
    GetMonth(monthIndex: number): string | null;
    
    /** Returns the month name for the given BS month index (Nepali unicode) */
    GetMonthInUnicode(monthIndex: number): string | null;
    
    /** Returns array of month names in BS (English) */
    GetMonths(): string[];
    
    /** Returns array of month names in BS (Nepali unicode) */
    GetMonthsInUnicode(): string[];
    
    /** Checks if checkDate is between startDate and endDate (inclusive by default) */
    IsBetweenDates(checkDate: DateObject | string, startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string, inclusive?: boolean): boolean;
    
    /** Checks if two BS dates are equal */
    IsEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): boolean;
    
    /** Checks if date1 > date2 in BS */
    IsGreaterThan(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): boolean;
    
    /** Checks if date1 >= date2 in BS */
    IsGreaterThanOrEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): boolean;
    
    /** Checks if date1 < date2 in BS */
    IsLessThan(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): boolean;
    
    /** Checks if date1 <= date2 in BS */
    IsLessThanOrEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): boolean;
    
    /** Validates a BS date */
    ValidateDate(bsDate: DateObject | string, dateFormat?: string): boolean;
  }
  
  
  /** Converts an AD date to BS (Nepali) date object or string */
  AD2BS(adDate: DateObject | string, sourceDateFormat?: string, returnDateFormat?: string): DateObject | string;
  
  /** Converts a BS (Nepali) date to AD date object or string */
  BS2AD(bsDate: DateObject | string, sourceDateFormat?: string, returnDateFormat?: string): DateObject | string;
  
  /** Formats a date object to a string in the given format */
  ConvertToDateFormat(dateObject: DateObject | string, returnFormat: string): string;
  
  /** Parses a date string into a NepaliDate object */
  ConvertToDateObject(dateString: string, dateFormat: string): DateObject;
  
  /** Converts a Nepali unicode number string to a number */
  ConvertToNumber(unicode: string): number;
  
  /** Converts a number to Nepali unicode string */
  ConvertToUnicode(num: number): string;
  
  /** Converts a number to its English words representation */
  NumberToWords(number: number, isCurrency: boolean): string;
  
  /** Converts a number to its Nepali words (unicode) representation */
  NumberToWordsUnicode(number: number, isCurrency: boolean): string;
  
  /** Parses a date string and returns its NepaliDate and format */
  ParseDate(dateString: string): { parsedDate: DateObject; parsedFormat: string; };

}

// Extend the Window interface to include NepaliFunctions
declare global {
  interface Window { NepaliFunctions: NepaliFunctions; }
}

export {}
