import { Moment } from 'moment';
import { IEndereco } from 'app/shared/model//endereco.model';
import { IFatura } from 'app/shared/model//fatura.model';

export interface IProduto {
    id?: number;
    nome?: string;
    dataCompra?: Moment;
    valor?: number;
    endereco?: IEndereco;
    produtos?: IFatura;
}

export class Produto implements IProduto {
    constructor(
        public id?: number,
        public nome?: string,
        public dataCompra?: Moment,
        public valor?: number,
        public endereco?: IEndereco,
        public produtos?: IFatura
    ) {}
}
