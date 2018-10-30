import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    ServicoComponent,
    ServicoDetailComponent,
    ServicoUpdateComponent,
    ServicoDeletePopupComponent,
    ServicoDeleteDialogComponent,
    servicoRoute,
    servicoPopupRoute
} from './';

const ENTITY_STATES = [...servicoRoute, ...servicoPopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ServicoComponent,
        ServicoDetailComponent,
        ServicoUpdateComponent,
        ServicoDeleteDialogComponent,
        ServicoDeletePopupComponent
    ],
    entryComponents: [ServicoComponent, ServicoUpdateComponent, ServicoDeleteDialogComponent, ServicoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareServicoModule {}
