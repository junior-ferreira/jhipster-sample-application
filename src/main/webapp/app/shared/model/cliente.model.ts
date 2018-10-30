import { IOrdemServico } from 'app/shared/model//ordem-servico.model';

export interface ICliente {
    id?: number;
    nome?: string;
    email?: string;
    telefone?: string;
    listaCartoes?: IOrdemServico[];
}

export class Cliente implements ICliente {
    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public telefone?: string,
        public listaCartoes?: IOrdemServico[]
    ) {}
}
