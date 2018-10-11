import { Moment } from 'moment';
import { IFatura } from 'app/shared/model//fatura.model';
import { ICliente } from 'app/shared/model//cliente.model';

export const enum StatusCartao {
    BLOQUEADO = 'BLOQUEADO',
    LIBERADO = 'LIBERADO',
    ROUBADO = 'ROUBADO'
}

export interface ICartao {
    id?: number;
    numero?: number;
    dataValidade?: Moment;
    nomeTitular?: string;
    codSeguranca?: number;
    limite?: number;
    statusCartao?: StatusCartao;
    faturas?: IFatura[];
    titular?: ICliente;
}

export class Cartao implements ICartao {
    constructor(
        public id?: number,
        public numero?: number,
        public dataValidade?: Moment,
        public nomeTitular?: string,
        public codSeguranca?: number,
        public limite?: number,
        public statusCartao?: StatusCartao,
        public faturas?: IFatura[],
        public titular?: ICliente
    ) {}
}
