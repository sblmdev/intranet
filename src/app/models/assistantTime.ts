export class AssistTime {
    fecha: string;
    dhoraingre_entrada: {
      minutesOffset: number;
      timestamp: string;
      offsetDateTime: string;
    };
    dhoraingre_salida: {
      minutesOffset: number;
      timestamp: string;
      offsetDateTime: string;
    };
    day: string;
  
    constructor(
      fecha: string,
      dhoraingre_entrada: {
        minutesOffset: number;
        timestamp: string;
        offsetDateTime: string;
      },
      dhoraingre_salida: {
        minutesOffset: number;
        timestamp: string;
        offsetDateTime: string;
      }
    ) {
      this.fecha = fecha;
      this.dhoraingre_entrada = dhoraingre_entrada;
      this.dhoraingre_salida = dhoraingre_salida;
      this.day = '';
    }
  }
  