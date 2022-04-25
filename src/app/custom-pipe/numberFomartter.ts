import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'withcoma' })
export class TransformNumber implements PipeTransform {
  transform(value: number | undefined): string {
    const numberStr = value ? value.toString() : '';
    return numberStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
