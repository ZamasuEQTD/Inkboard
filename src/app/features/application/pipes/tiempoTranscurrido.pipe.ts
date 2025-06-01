import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoTranscurrido',
})
export class TiempoTranscurridoPipe implements PipeTransform {

  transform(value: Date, ...args: any[]): string {
  const date = new Date(value);

    // 1. Validación de fecha: Asegúrate de que 'value' sea una fecha válida.
    if (isNaN(date.getTime())) {
        return 'Fecha inválida';
    }

    // 2. Calcular la diferencia en milisegundos entre la fecha dada y la fecha actual.
    // Usamos Math.abs para asegurar que la diferencia sea siempre positiva,
    // sin importar si 'date' es en el pasado o futuro respecto a Date.now().
    const diferenciaMilisegundos = Math.abs(date.getTime() - Date.now());

    // 3. Convertir la diferencia a unidades de tiempo.
    const diferenciaSegundos = Math.floor(diferenciaMilisegundos / 1000);
    const diferenciaMinutos = Math.floor(diferenciaSegundos / 60);
    const diferenciaHoras = Math.floor(diferenciaMinutos / 60);
    const diferenciaDias = Math.floor(diferenciaHoras / 24);
    // Para meses, es una aproximación común dividir por 30 días.
    const diferenciaMeses = Math.floor(diferenciaDias / 30); 

    // 4. Definir los mensajes según la diferencia, priorizando las unidades más pequeñas.
    if (diferenciaSegundos < 10) {
        return "ahora";
    } else if (diferenciaSegundos < 60) {
        // Si es menos de un minuto, muestra los segundos.
        return `${diferenciaSegundos}s`;
    } else if (diferenciaMinutos < 60) {
        // Si es menos de una hora, muestra los minutos.
        return `${diferenciaMinutos}m`;
    } else if (diferenciaHoras < 24) {
        // Si es menos de un día, muestra las horas.
        return `${diferenciaHoras}h`;
    } else if (diferenciaDias < 30) {
        // Si es menos de un mes, muestra los días.
        return `${diferenciaDias}d`;
    } else {
        // Si es un mes o más, muestra los meses.
        return `${diferenciaMeses}ms`;
    }
  }
}
