import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetoeasoftwareCartaoModule } from './cartao/cartao.module';
import { ProjetoeasoftwareClienteModule } from './cliente/cliente.module';
import { ProjetoeasoftwareEnderecoModule } from './endereco/endereco.module';
import { ProjetoeasoftwareCategoriaClienteModule } from './categoria-cliente/categoria-cliente.module';
import { ProjetoeasoftwareFaturaModule } from './fatura/fatura.module';
import { ProjetoeasoftwareProdutoModule } from './produto/produto.module';
import { ProjetoeasoftwarePagamentoModule } from './pagamento/pagamento.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ProjetoeasoftwareCartaoModule,
        ProjetoeasoftwareClienteModule,
        ProjetoeasoftwareEnderecoModule,
        ProjetoeasoftwareCategoriaClienteModule,
        ProjetoeasoftwareFaturaModule,
        ProjetoeasoftwareProdutoModule,
        ProjetoeasoftwarePagamentoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareEntityModule {}
