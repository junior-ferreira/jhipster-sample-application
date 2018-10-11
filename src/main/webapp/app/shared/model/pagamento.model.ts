import { Moment } from 'moment';
import { IFatura } from 'app/shared/model//fatura.model';
import { ICliente } from 'app/shared/model//cliente.model';

export interface IPagamento {
    id?: number;
    dataPagamento?: Moment;
    valor?: number;
    nomeBanco?: string;
    fatura?: IFatura;
    cliente?: ICliente;
}

export class Pagamento implements IPagamento {
    constructor(
        public id?: number,
        public dataPagamento?: Moment,
        public valor?: number,
        public nomeBanco?: string,
        public fatura?: IFatura,
        public cliente?: ICliente
    ) {}
}
