import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    OrdemServicoComponent,
    OrdemServicoDetailComponent,
    OrdemServicoUpdateComponent,
    OrdemServicoDeletePopupComponent,
    OrdemServicoDeleteDialogComponent,
    ordemServicoRoute,
    ordemServicoPopupRoute
} from './';

const ENTITY_STATES = [...ordemServicoRoute, ...ordemServicoPopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrdemServicoComponent,
        OrdemServicoDetailComponent,
        OrdemServicoUpdateComponent,
        OrdemServicoDeleteDialogComponent,
        OrdemServicoDeletePopupComponent
    ],
    entryComponents: [
        OrdemServicoComponent,
        OrdemServicoUpdateComponent,
        OrdemServicoDeleteDialogComponent,
        OrdemServicoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareOrdemServicoModule {}
