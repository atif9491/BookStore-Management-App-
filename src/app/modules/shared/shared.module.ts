import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { CustomPbdatePipe } from './pipes/custom-pbdate.pipe';




@NgModule({
  declarations: [HighlightDirective,CurrencyFormatPipe,CustomPbdatePipe],
  imports: [
    CommonModule
  ],
  exports:[HighlightDirective,CurrencyFormatPipe,CustomPbdatePipe]
})
export class SharedModule { }
