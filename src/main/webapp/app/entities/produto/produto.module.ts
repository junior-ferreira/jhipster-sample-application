import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    ProdutoComponent,
    ProdutoDetailComponent,
    ProdutoUpdateComponent,
    ProdutoDeletePopupComponent,
    ProdutoDeleteDialogComponent,
    produtoRoute,
    produtoPopupRoute
} from './';

const ENTITY_STATES = [...produtoRoute, ...produtoPopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProdutoComponent,
        ProdutoDetailComponent,
        ProdutoUpdateComponent,
        ProdutoDeleteDialogComponent,
        ProdutoDeletePopupComponent
    ],
    entryComponents: [ProdutoComponent, ProdutoUpdateComponent, ProdutoDeleteDialogComponent, ProdutoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareProdutoModule {}
