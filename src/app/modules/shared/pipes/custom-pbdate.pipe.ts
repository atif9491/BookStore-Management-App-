import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPbdate',
})
export class CustomPbdatePipe implements PipeTransform {

  transform(pbdate: string): string | null {
    if (pbdate && pbdate.length === 8) {
      const day = pbdate.substring(0, 2);
      const month = pbdate.substring(2, 4);
      const year = pbdate.substring(4);

      // Create date using Date constructor with numeric values
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

      if (!isNaN(dateObj.getTime())) {
        // Return formatted date using toLocaleDateString
        return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      }
    }
    return null;
  }

}
