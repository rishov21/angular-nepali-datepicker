import { Component, Input, Output, EventEmitter, AfterViewInit, OnInit, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RtcNepaliDatepickerService } from './angular-nepali-datepicker.service';
import { DateObject } from './types';

@Component({
  selector: 'rtc-nepali-datepicker',
  template: `
    <input
      #nepaliInput
      type="text"
      [id]="pickerId"
      [class]="options.classes || 'form-control'"
      [placeholder]="options.placeholder || 'Select Nepali Date'"
      [disabled]="options.disabled || false"
      (keydown)="onKeyDown($event)"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RtcNepaliDatepickerComponent),
      multi: true
    }
  ]
})
export class RtcNepaliDatepickerComponent implements AfterViewInit, OnInit {
  @Input() options: {
    classes?: string;
    placeholder?: string;
    dateFormat?: string;
    closeOnDateSelect?: boolean;
    minDate?: { year: number; month: number; day: number };
    maxDate?: { year: number; month: number; day: number };
    disabled?: boolean;
    unicodeDate?: boolean;
    language?: string;
    onSelect?: (date: any) => void;
  } = {};

  @Output() dateChange = new EventEmitter<any>();
  @Input() value: any;
  @Input() pickerId: string = 'angular-nepali-datepicker-default';
  public disabled: boolean = false;
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  @ViewChild('nepaliInput', { static: true }) inputElementRef!: ElementRef;
  defaultOptions: any;
  todayDate: DateObject = { year: 0, month: 0, day: 0, value: '' };
  constructor(private service: RtcNepaliDatepickerService) { }

  ngOnInit(): void {
    this.service.BSGetCurrentDate().then(currentDate => {
      this.todayDate = currentDate;
      this.defaultOptions = {
        classes: 'form-control',
        placeholder: 'Select Nepali Date',
        dateFormat: 'YYYY-MM-DD',
        closeOnDateSelect: true,
        minDate: { year: 1800, month: 1, day: 1 },
        maxDate: currentDate,
        disabled: false,
        unicodeDate: true,
        language: 'nepali',
      };
    })
  }

  onKeyDown(event: KeyboardEvent): boolean {
    event.preventDefault();
    return false;
  }
  ngAfterViewInit(): void {
    this.service.loadLibrary().then(() => {
      this.service.BSGetCurrentDate().then(currentDate => {
        this.todayDate = {
          ...currentDate,
          value: this.service.formatDate(currentDate, this.options.dateFormat || 'YYYY-MM-DD')
        };
        this.defaultOptions = {
          classes: 'form-control',
          placeholder: 'Select Nepali Date',
          dateFormat: 'YYYY-MM-DD',
          closeOnDateSelect: true,
          minDate: { year: 1800, month: 1, day: 1 },
          maxDate: currentDate,
          disabled: false,
          unicodeDate: true,
          language: 'nepali',
          tooltip: 'Select Date'
        };
        this.initializeDatePicker();
        this.service.registerComponent(this.pickerId, this);
      })
    }).catch((error) => {
      console.error('Failed to load Nepali Date Picker library:', error);
    });
  }

  private initializeDatePicker(): void {
    const input = this.inputElementRef.nativeElement;
    if (!input || typeof input.NepaliDatePicker !== 'function') {
      console.error('Nepali Date Picker is not loaded. Make sure the assets is included in consumer angular.json.');
      return;
    }
    const config = {
      ...this.defaultOptions,
      ...this.options,
      onSelect: (bsDate: any) => {
        this.dateChange.emit(bsDate);
        input.dispatchEvent(new Event('change'));
      }
    };
    input.NepaliDatePicker(config);
  }

  public setDate(bsDate: string): void {
    const input = this.inputElementRef.nativeElement;
    if (!input || typeof input.NepaliDatePicker !== 'function') return;
    try {
      input.NepaliDatePicker('destroy');
      const updatedOptions = {
        ...this.defaultOptions,
        ...this.options,
        value: bsDate,
        onSelect: (selectedDate: any) => {
          this.dateChange.emit(selectedDate);
          input.dispatchEvent(new Event('change'));
        },
      };

      const setValueAndInit = (displayValue: string) => {
        input.NepaliDatePicker(updatedOptions);
        input.value = displayValue;
      };
      if (updatedOptions.unicodeDate) {
        const convertFullString = (str: string): Promise<string> => {
          return Promise.all(str.split('').map(d => this.service.ConvertToUnicode(+d)))
            .then(digits => digits.join(''));
        };
        const [year, month, day] = bsDate.split('-');
        Promise.all([
          convertFullString(year),
          convertFullString(month),
          convertFullString(day)
        ]).then(([unicodeYear, unicodeMonth, unicodeDay]) => {
          setValueAndInit(`${unicodeYear}-${unicodeMonth}-${unicodeDay}`);
        });
      } else {
        setValueAndInit(bsDate);
      }
    } catch (err) {
      console.warn('Failed to set date via NepaliDatePicker:', err);
    }
  }

  writeValue(value: any): void {
    this.value = value;
    if (value) this.service.setDate(this.pickerId, value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.service.unregisterComponent(this.pickerId);
    const input = this.inputElementRef.nativeElement;
    if (input && typeof input.NepaliDatePicker === 'function') {
      input.NepaliDatePicker('destroy');
    }
  }

}