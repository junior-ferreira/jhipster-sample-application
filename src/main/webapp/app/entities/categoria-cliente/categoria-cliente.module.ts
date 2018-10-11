import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    CategoriaClienteComponent,
    CategoriaClienteDetailComponent,
    CategoriaClienteUpdateComponent,
    CategoriaClienteDeletePopupComponent,
    CategoriaClienteDeleteDialogComponent,
    categoriaClienteRoute,
    categoriaClientePopupRoute
} from './';

const ENTITY_STATES = [...categoriaClienteRoute, ...categoriaClientePopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoriaClienteComponent,
        CategoriaClienteDetailComponent,
        CategoriaClienteUpdateComponent,
        CategoriaClienteDeleteDialogComponent,
        CategoriaClienteDeletePopupComponent
    ],
    entryComponents: [
        CategoriaClienteComponent,
        CategoriaClienteUpdateComponent,
        CategoriaClienteDeleteDialogComponent,
        CategoriaClienteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareCategoriaClienteModule {}
