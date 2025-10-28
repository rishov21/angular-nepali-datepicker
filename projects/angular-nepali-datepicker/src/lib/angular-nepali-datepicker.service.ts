import { Injectable } from '@angular/core';
import { DateObject, NepaliFunctions } from './types';
import { RtcNepaliDatepickerComponent } from './angular-nepali-datepicker.component';

@Injectable()
export class RtcNepaliDatepickerService {
  private basePath = '/assets';
  private libraryLoadedPromise: Promise<void> | null = null;
  private isLoaded = false;
  private componentMap: Map<string, RtcNepaliDatepickerComponent> = new Map();
  private setDateQueue: Map<string, string> = new Map();
  
  registerComponent(id: string, component: RtcNepaliDatepickerComponent): void {
    this.componentMap.set(id, component);
    if (this.setDateQueue.has(id)) {
      const bsDate = this.setDateQueue.get(id)!;
      component.setDate(bsDate);
      this.setDateQueue.delete(id);
    }
  }
  
  unregisterComponent(id: string): void {
    this.componentMap.delete(id);
    this.setDateQueue.delete(id);
  }
  
  setDate(id: string, bsDate: string): void {
    const component = this.componentMap.get(id);
    if (component) {
      component.setDate(bsDate);
    } else {
      this.setDateQueue.set(id, bsDate);
      console.warn(`Component with ID ${id} not yet registered. Queuing setDate request for ${bsDate}`);
    }
  }
  
  public formatDate(date: { year: number; month: number; day: number }, format: string): string {
  const yyyy = date.year.toString();
  const mm = date.month.toString().padStart(2, '0');
  const dd = date.day.toString().padStart(2, '0');
  return format.replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd);
}

  loadLibrary(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }
    if (!this.libraryLoadedPromise) {
      this.libraryLoadedPromise = new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `${this.basePath}/nepali.datepicker.v1.0.4.min.css`;
        link.onload = () => {
          console.log('CSS loaded successfully');
          this.loadNepaliDatePicker(resolve, reject);
        };
        link.onerror = (error) => {
          console.error('Failed to load CSS:', error);
          reject(error);
        };
        document.head.appendChild(link);
      });
    }
    return this.libraryLoadedPromise;
  }

  private loadNepaliDatePicker(resolve: () => void, reject: (reason?: any) => void): void {
    const script = document.createElement('script');
    script.src = `${this.basePath}/nepali.datepicker.v1.0.4.min.js`;
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('Nepali Datepicker JS loaded successfully');
      this.isLoaded = true;
      resolve();
    };
    script.onerror = (error) => {
      console.error('Failed to load Nepali Datepicker JS:', error);
      reject(error);
    };
    document.body.appendChild(script);
  }

  private async ensureLibraryLoaded(): Promise<NepaliFunctions> {
    await this.loadLibrary();
    if (typeof window.NepaliFunctions === 'undefined') {
      throw new Error('NepaliFunctions not available');
    }
    return window.NepaliFunctions;
  }

  async AD2BS(adDate: DateObject | string, sourceDateFormat?: string, returnDateFormat?: string): Promise<DateObject | string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD2BS(adDate, sourceDateFormat, returnDateFormat);
  }
  
  async BS2AD(bsDate: DateObject | string, sourceDateFormat?: string, returnDateFormat?: string): Promise<DateObject | string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS2AD(bsDate, sourceDateFormat, returnDateFormat);
  }

  async ConvertToDateFormat(dateObject: DateObject | string, returnFormat: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.ConvertToDateFormat(dateObject, returnFormat);
  }

  async ConvertToDateObject(dateString: string, dateFormat: string): Promise<DateObject> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return {
      ...NepaliFunctions.ConvertToDateObject(dateString, dateFormat),
      value: dateString
    };
  }

  async ConvertToNumber(unicode: string): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.ConvertToNumber(unicode);
  }

  async ConvertToUnicode(num: number): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.ConvertToUnicode(num);
  }

  async NumberToWords(number: number, isCurrency: boolean): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.NumberToWords(number, isCurrency);
  }

  async NumberToWordsUnicode(number: number, isCurrency: boolean): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.NumberToWordsUnicode(number, isCurrency);
  }

  async ParseDate(dateString: string): Promise<{ parsedDate: DateObject; parsedFormat: string }> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.ParseDate(dateString);
  }

  async ADDatesDiff(startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.DatesDiff(startDate, endDate, dateFormat!);
  }

  async ADGetCurrentDate(dateFormat?: string): Promise<DateObject> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetCurrentDate(dateFormat!);
  }

  async ADGetCurrentDay(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetCurrentDay();
  }

  async ADGetCurrentMonth(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetCurrentMonth();
  }

  async ADGetCurrentYear(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetCurrentYear();
  }

  async ADGetDay(dayIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetDay(dayIndex);
  }

  async ADGetDays(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetDays();
  }

  async ADGetDaysInMonth(year: number, month: number): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetDaysInMonth(year, month);
  }

  async ADGetDayShort(dayIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetDayShort(dayIndex);
  }

  async ADGetDaysShort(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetDaysShort();
  }

  async ADGetFullDate(adDate: DateObject | string, dateFormat?: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetFullDate(adDate, dateFormat!);
  }

  async ADGetFullDay(adDate: DateObject | string, dateFormat?: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetFullDay(adDate, dateFormat!);
  }

  async ADGetMonth(monthIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetMonth(monthIndex);
  }

  async ADGetMonths(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.AD.GetMonths();
  }

  async BSAddDays(bsDate: DateObject | string, noOfDays: number, dateFormat?: string): Promise<DateObject | string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.AddDays(bsDate, noOfDays, dateFormat!);
  }

  async BSDatesDiff(startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.DatesDiff(startDate, endDate, dateFormat!);
  }

  async BSGetCurrentDate(dateFormat?: string): Promise<DateObject> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetCurrentDate(dateFormat!);
  }

  async BSGetCurrentDay(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetCurrentDay();
  }

  async BSGetCurrentMonth(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetCurrentMonth();
  }

  async BSGetCurrentYear(): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetCurrentYear();
  }

  async BSGetDayInUnicode(dayIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetDayInUnicode(dayIndex);
  }

  async BSGetDaysInUnicodeShort(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetDaysInUnicodeShort();
  }

  async BSGetDaysInMonth(year: number, month: number): Promise<number> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetDaysInMonth(year, month);
  }

  async BSGetDaysInUnicode(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetDaysInUnicode();
  }

  async BSGetDayInUnicodeShort(dayIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetDayInUnicodeShort(dayIndex);
  }

  async BSGetFullDate(bsDate: DateObject | string, unicode: boolean, dateFormat?: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetFullDate(bsDate, unicode, dateFormat!);
  }

  async BSGetFullDay(bsDate: DateObject | string, dateFormat?: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetFullDay(bsDate, dateFormat!);
  }

  async BSGetFullDayInUnicode(bsDate: DateObject | string, dateFormat?: string): Promise<string> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetFullDayInUnicode(bsDate, dateFormat!);
  }

  async BSGetMonth(monthIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetMonth(monthIndex);
  }

  async BSGetMonthInUnicode(monthIndex: number): Promise<string | null> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetMonthInUnicode(monthIndex);
  }

  async BSGetMonths(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetMonths();
  }

  async BSGetMonthsInUnicode(): Promise<string[]> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.GetMonthsInUnicode();
  }

  async BSIsBetweenDates(checkDate: DateObject | string, startDate: DateObject | string, endDate: DateObject | string, dateFormat?: string, inclusive?: boolean): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsBetweenDates(checkDate, startDate, endDate, dateFormat!, inclusive!);
  }

  async BSIsEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsEqualTo(date1, date2, dateFormat!);
  }

  async BSIsGreaterThan(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsGreaterThan(date1, date2, dateFormat!);
  }

  async BSIsGreaterThanOrEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsGreaterThanOrEqualTo(date1, date2, dateFormat!);
  }

  async BSIsLessThan(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsLessThan(date1, date2, dateFormat!);
  }

  async BSIsLessThanOrEqualTo(date1: DateObject | string, date2: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.IsLessThanOrEqualTo(date1, date2, dateFormat!);
  }

  async BSValidateDate(bsDate: DateObject | string, dateFormat?: string): Promise<boolean> {
    const NepaliFunctions = await this.ensureLibraryLoaded();
    return NepaliFunctions.BS.ValidateDate(bsDate, dateFormat!);
  }
}