import { Moment } from 'moment';
import { IProduto } from 'app/shared/model//produto.model';
import { IPagamento } from 'app/shared/model//pagamento.model';
import { ICliente } from 'app/shared/model//cliente.model';
import { ICartao } from 'app/shared/model//cartao.model';

export const enum StatusFatura {
    GERADA = 'GERADA',
    ATRASADA = 'ATRASADA',
    CANCELADA = 'CANCELADA',
    PAGA = 'PAGA'
}

export interface IFatura {
    id?: number;
    dataProcessamento?: Moment;
    valorTotal?: number;
    pontuacao?: number;
    statusFatura?: StatusFatura;
    produtos?: IProduto[];
    pagamento?: IPagamento;
    cliente?: ICliente;
    faturas?: ICartao;
}

export class Fatura implements IFatura {
    constructor(
        public id?: number,
        public dataProcessamento?: Moment,
        public valorTotal?: number,
        public pontuacao?: number,
        public statusFatura?: StatusFatura,
        public produtos?: IProduto[],
        public pagamento?: IPagamento,
        public cliente?: ICliente,
        public faturas?: ICartao
    ) {}
}
