import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: string | Date): string {
    return formatDistanceToNow(new Date(value), { addSuffix: true });
  }

}
