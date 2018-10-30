import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetoeasoftwareClienteModule } from './cliente/cliente.module';
import { ProjetoeasoftwareServicoModule } from './servico/servico.module';
import { ProjetoeasoftwareEnderecoModule } from './endereco/endereco.module';
import { ProjetoeasoftwareOrdemServicoModule } from './ordem-servico/ordem-servico.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ProjetoeasoftwareClienteModule,
        ProjetoeasoftwareServicoModule,
        ProjetoeasoftwareEnderecoModule,
        ProjetoeasoftwareOrdemServicoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareEntityModule {}
