import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtcNepaliDatepickerService } from './angular-nepali-datepicker.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RtcNepaliDatepickerComponent } from './angular-nepali-datepicker.component';

@NgModule({
  declarations: [RtcNepaliDatepickerComponent],
  exports: [RtcNepaliDatepickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [RtcNepaliDatepickerService]
})
export class RtcNepaliDatePickerModule { }