import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoTranscurrido',
})
export class TiempoTranscurridoPipe implements PipeTransform {

  transform(value: Date, ...args: any[]): string {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Calculate the time difference in various units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} ms`;
    }
    if (days > 0) {
      return `${days} d`;
    } else if (hours > 0) {
      return `${hours} hs`;
    } else if (minutes > 0) {
      return `${minutes} mn`;
    } else {
      return `${seconds} sgs`;
    }
  }
}
