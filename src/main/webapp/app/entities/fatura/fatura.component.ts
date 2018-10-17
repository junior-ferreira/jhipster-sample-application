import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFatura } from 'app/shared/model/fatura.model';
import { Principal } from 'app/core';
import { FaturaService } from './fatura.service';

@Component({
    selector: 'jhi-fatura',
    templateUrl: './fatura.component.html'
})
export class FaturaComponent implements OnInit, OnDestroy {
    faturas: IFatura[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private faturaService: FaturaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.faturaService.query().subscribe(
            (res: HttpResponse<IFatura[]>) => {
                this.faturas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFaturas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFatura) {
        return item.id;
    }

    registerChangeInFaturas() {
        this.eventSubscriber = this.eventManager.subscribe('faturaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
