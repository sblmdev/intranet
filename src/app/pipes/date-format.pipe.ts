import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const parts = value.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}
