import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';
import { FaturaComponent } from './fatura.component';
import { FaturaDetailComponent } from './fatura-detail.component';
import { FaturaUpdateComponent } from './fatura-update.component';
import { FaturaDeletePopupComponent } from './fatura-delete-dialog.component';
import { IFatura } from 'app/shared/model/fatura.model';

@Injectable({ providedIn: 'root' })
export class FaturaResolve implements Resolve<IFatura> {
    constructor(private service: FaturaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fatura: HttpResponse<Fatura>) => fatura.body));
        }
        return of(new Fatura());
    }
}

export const faturaRoute: Routes = [
    {
        path: 'fatura',
        component: FaturaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.fatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fatura/:id/view',
        component: FaturaDetailComponent,
        resolve: {
            fatura: FaturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.fatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fatura/new',
        component: FaturaUpdateComponent,
        resolve: {
            fatura: FaturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.fatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fatura/:id/edit',
        component: FaturaUpdateComponent,
        resolve: {
            fatura: FaturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.fatura.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const faturaPopupRoute: Routes = [
    {
        path: 'fatura/:id/delete',
        component: FaturaDeletePopupComponent,
        resolve: {
            fatura: FaturaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.fatura.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
