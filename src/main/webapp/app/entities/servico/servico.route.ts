import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servico } from 'app/shared/model/servico.model';
import { ServicoService } from './servico.service';
import { ServicoComponent } from './servico.component';
import { ServicoDetailComponent } from './servico-detail.component';
import { ServicoUpdateComponent } from './servico-update.component';
import { ServicoDeletePopupComponent } from './servico-delete-dialog.component';
import { IServico } from 'app/shared/model/servico.model';

@Injectable({ providedIn: 'root' })
export class ServicoResolve implements Resolve<IServico> {
    constructor(private service: ServicoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((servico: HttpResponse<Servico>) => servico.body));
        }
        return of(new Servico());
    }
}

export const servicoRoute: Routes = [
    {
        path: 'servico',
        component: ServicoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'servico/:id/view',
        component: ServicoDetailComponent,
        resolve: {
            servico: ServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'servico/new',
        component: ServicoUpdateComponent,
        resolve: {
            servico: ServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'servico/:id/edit',
        component: ServicoUpdateComponent,
        resolve: {
            servico: ServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicoPopupRoute: Routes = [
    {
        path: 'servico/:id/delete',
        component: ServicoDeletePopupComponent,
        resolve: {
            servico: ServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
