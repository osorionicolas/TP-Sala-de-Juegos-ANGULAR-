export class JuegoAgilidad {
    public numeroIngresado: number;
    public primerNumero: number;
    public segundoNumero: number;
    public operador: string;
    public gano: boolean;

    public randomValores() {
        this.primerNumero = Math.floor(Math.random() * 50) + 1;
        this.segundoNumero = Math.floor(Math.random() * 50) + 1;
        let numOperador = Math.floor(Math.random() * 3);

        switch (numOperador) {
            case 0:
                this.operador = "+";
                break;

            case 1:
                this.operador = "*";
                break;
            case 2:
                this.operador = "-";
                break;
            // case 3:
            //     this.operador = "/";
            //     break;
        }
    }
}
