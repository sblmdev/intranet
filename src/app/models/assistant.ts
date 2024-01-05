export class Assist {
    idasistencia: string
    codreloj: string;
    dhoraingre: string;
    dfechaingre: string;
    numreloj: string;
    dfechudp: string;
    vusuario: string;
    vestacion: string;
    papeleta: string;
    idtrab_pape: string;

    constructor(
        idasistencia: string = '',
        codreloj: string = '',
        dhoraingre: string = '',
        dfechaingre: string = '',
        numreloj: string = '',
        dfechudp: string = '',
        vusuario: string = '',
        vestacion: string = '',
        papeleta: string = '',
        idtrab_pape: string = '',
    ) {
        this.idasistencia = idasistencia;
        this.codreloj = codreloj;
        this.dhoraingre = dhoraingre;
        this.dfechaingre = dfechaingre;
        this.numreloj = numreloj;
        this.dfechudp = dfechudp;
        this.vusuario = vusuario;
        this.vestacion = vestacion;
        this.papeleta = papeleta;
        this.idtrab_pape = idtrab_pape;
    }
}

