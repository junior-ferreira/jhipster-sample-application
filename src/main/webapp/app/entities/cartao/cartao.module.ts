import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    CartaoComponent,
    CartaoDetailComponent,
    CartaoUpdateComponent,
    CartaoDeletePopupComponent,
    CartaoDeleteDialogComponent,
    cartaoRoute,
    cartaoPopupRoute
} from './';

const ENTITY_STATES = [...cartaoRoute, ...cartaoPopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CartaoComponent, CartaoDetailComponent, CartaoUpdateComponent, CartaoDeleteDialogComponent, CartaoDeletePopupComponent],
    entryComponents: [CartaoComponent, CartaoUpdateComponent, CartaoDeleteDialogComponent, CartaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareCartaoModule {}
