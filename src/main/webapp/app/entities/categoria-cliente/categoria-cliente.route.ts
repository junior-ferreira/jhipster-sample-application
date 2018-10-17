import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriaCliente } from 'app/shared/model/categoria-cliente.model';
import { CategoriaClienteService } from './categoria-cliente.service';
import { CategoriaClienteComponent } from './categoria-cliente.component';
import { CategoriaClienteDetailComponent } from './categoria-cliente-detail.component';
import { CategoriaClienteUpdateComponent } from './categoria-cliente-update.component';
import { CategoriaClienteDeletePopupComponent } from './categoria-cliente-delete-dialog.component';
import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';

@Injectable({ providedIn: 'root' })
export class CategoriaClienteResolve implements Resolve<ICategoriaCliente> {
    constructor(private service: CategoriaClienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((categoriaCliente: HttpResponse<CategoriaCliente>) => categoriaCliente.body));
        }
        return of(new CategoriaCliente());
    }
}

export const categoriaClienteRoute: Routes = [
    {
        path: 'categoria-cliente',
        component: CategoriaClienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.categoriaCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-cliente/:id/view',
        component: CategoriaClienteDetailComponent,
        resolve: {
            categoriaCliente: CategoriaClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.categoriaCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-cliente/new',
        component: CategoriaClienteUpdateComponent,
        resolve: {
            categoriaCliente: CategoriaClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.categoriaCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'categoria-cliente/:id/edit',
        component: CategoriaClienteUpdateComponent,
        resolve: {
            categoriaCliente: CategoriaClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.categoriaCliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaClientePopupRoute: Routes = [
    {
        path: 'categoria-cliente/:id/delete',
        component: CategoriaClienteDeletePopupComponent,
        resolve: {
            categoriaCliente: CategoriaClienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetoeasoftwareApp.categoriaCliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
