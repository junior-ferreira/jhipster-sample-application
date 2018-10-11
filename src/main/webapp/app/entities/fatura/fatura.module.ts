import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetoeasoftwareSharedModule } from 'app/shared';
import {
    FaturaComponent,
    FaturaDetailComponent,
    FaturaUpdateComponent,
    FaturaDeletePopupComponent,
    FaturaDeleteDialogComponent,
    faturaRoute,
    faturaPopupRoute
} from './';

const ENTITY_STATES = [...faturaRoute, ...faturaPopupRoute];

@NgModule({
    imports: [ProjetoeasoftwareSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FaturaComponent, FaturaDetailComponent, FaturaUpdateComponent, FaturaDeleteDialogComponent, FaturaDeletePopupComponent],
    entryComponents: [FaturaComponent, FaturaUpdateComponent, FaturaDeleteDialogComponent, FaturaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetoeasoftwareFaturaModule {}
