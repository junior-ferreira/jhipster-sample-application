import { Moment } from 'moment';
import { IServico } from 'app/shared/model//servico.model';
import { ICliente } from 'app/shared/model//cliente.model';

export interface IOrdemServico {
    id?: number;
    dataProcessamento?: Moment;
    servico?: string;
    valorTotal?: number;
    servico?: IServico;
    servico?: ICliente;
}

export class OrdemServico implements IOrdemServico {
    constructor(
        public id?: number,
        public dataProcessamento?: Moment,
        public servico?: string,
        public valorTotal?: number,
        public servico?: IServico,
        public servico?: ICliente
    ) {}
}
