import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICartao } from 'app/shared/model/cartao.model';
import { Principal } from 'app/core';
import { CartaoService } from './cartao.service';

@Component({
    selector: 'jhi-cartao',
    templateUrl: './cartao.component.html'
})
export class CartaoComponent implements OnInit, OnDestroy {
    cartaos: ICartao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cartaoService: CartaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cartaoService.query().subscribe(
            (res: HttpResponse<ICartao[]>) => {
                this.cartaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCartaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICartao) {
        return item.id;
    }

    registerChangeInCartaos() {
        this.eventSubscriber = this.eventManager.subscribe('cartaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
