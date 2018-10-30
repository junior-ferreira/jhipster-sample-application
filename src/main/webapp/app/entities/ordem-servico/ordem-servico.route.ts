import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrdemServico } from 'app/shared/model/ordem-servico.model';
import { OrdemServicoService } from './ordem-servico.service';
import { OrdemServicoComponent } from './ordem-servico.component';
import { OrdemServicoDetailComponent } from './ordem-servico-detail.component';
import { OrdemServicoUpdateComponent } from './ordem-servico-update.component';
import { OrdemServicoDeletePopupComponent } from './ordem-servico-delete-dialog.component';
import { IOrdemServico } from 'app/shared/model/ordem-servico.model';

@Injectable({ providedIn: 'root' })
export class OrdemServicoResolve implements Resolve<IOrdemServico> {
    constructor(private service: OrdemServicoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ordemServico: HttpResponse<OrdemServico>) => ordemServico.body));
        }
        return of(new OrdemServico());
    }
}

export const ordemServicoRoute: Routes = [
    {
        path: 'ordem-servico',
        component: OrdemServicoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.ordemServico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordem-servico/:id/view',
        component: OrdemServicoDetailComponent,
        resolve: {
            ordemServico: OrdemServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.ordemServico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordem-servico/new',
        component: OrdemServicoUpdateComponent,
        resolve: {
            ordemServico: OrdemServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.ordemServico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ordem-servico/:id/edit',
        component: OrdemServicoUpdateComponent,
        resolve: {
            ordemServico: OrdemServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.ordemServico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ordemServicoPopupRoute: Routes = [
    {
        path: 'ordem-servico/:id/delete',
        component: OrdemServicoDeletePopupComponent,
        resolve: {
            ordemServico: OrdemServicoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.ordemServico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
