import { IOrdemServico } from 'app/shared/model//ordem-servico.model';

export interface IServico {
    id?: number;
    nome?: string;
    descricao?: string;
    valor?: number;
    nomes?: IOrdemServico[];
}

export class Servico implements IServico {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public valor?: number,
        public nomes?: IOrdemServico[]
    ) {}
}
