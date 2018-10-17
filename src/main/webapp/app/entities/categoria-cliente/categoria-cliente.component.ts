import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';
import { Principal } from 'app/core';
import { CategoriaClienteService } from './categoria-cliente.service';

@Component({
    selector: 'jhi-categoria-cliente',
    templateUrl: './categoria-cliente.component.html'
})
export class CategoriaClienteComponent implements OnInit, OnDestroy {
    categoriaClientes: ICategoriaCliente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoriaClienteService: CategoriaClienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.categoriaClienteService.query().subscribe(
            (res: HttpResponse<ICategoriaCliente[]>) => {
                this.categoriaClientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoriaClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoriaCliente) {
        return item.id;
    }

    registerChangeInCategoriaClientes() {
        this.eventSubscriber = this.eventManager.subscribe('categoriaClienteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
