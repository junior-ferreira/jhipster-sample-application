import { ICliente } from 'app/shared/model//cliente.model';

export interface ICategoriaCliente {
    id?: number;
    nome?: string;
    descricao?: string;
    pontuacaoMinima?: number;
    clientes?: ICliente[];
}

export class CategoriaCliente implements ICategoriaCliente {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public pontuacaoMinima?: number,
        public clientes?: ICliente[]
    ) {}
}
