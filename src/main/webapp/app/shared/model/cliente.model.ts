import { IFatura } from 'app/shared/model//fatura.model';
import { ICartao } from 'app/shared/model//cartao.model';
import { IPagamento } from 'app/shared/model//pagamento.model';
import { ICategoriaCliente } from 'app/shared/model//categoria-cliente.model';

export interface ICliente {
    id?: number;
    nome?: string;
    email?: string;
    telefone?: string;
    fatura?: IFatura;
    listaCartoes?: ICartao[];
    pagamento?: IPagamento;
    clientes?: ICategoriaCliente;
}

export class Cliente implements ICliente {
    constructor(
        public id?: number,
        public nome?: string,
        public email?: string,
        public telefone?: string,
        public fatura?: IFatura,
        public listaCartoes?: ICartao[],
        public pagamento?: IPagamento,
        public clientes?: ICategoriaCliente
    ) {}
}
