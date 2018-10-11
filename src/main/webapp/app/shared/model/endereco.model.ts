import { ICliente } from 'app/shared/model//cliente.model';
import { IProduto } from 'app/shared/model//produto.model';

export interface IEndereco {
    id?: number;
    nome?: string;
    logradouro?: string;
    numero?: string;
    referencia?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    cliente?: ICliente;
    produto?: IProduto;
}

export class Endereco implements IEndereco {
    constructor(
        public id?: number,
        public nome?: string,
        public logradouro?: string,
        public numero?: string,
        public referencia?: string,
        public bairro?: string,
        public cidade?: string,
        public cep?: string,
        public cliente?: ICliente,
        public produto?: IProduto
    ) {}
}
