import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServico } from 'app/shared/model/servico.model';
import { Principal } from 'app/core';
import { ServicoService } from './servico.service';

@Component({
    selector: 'jhi-servico',
    templateUrl: './servico.component.html'
})
export class ServicoComponent implements OnInit, OnDestroy {
    servicos: IServico[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private servicoService: ServicoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.servicoService.query().subscribe(
            (res: HttpResponse<IServico[]>) => {
                this.servicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInServicos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IServico) {
        return item.id;
    }

    registerChangeInServicos() {
        this.eventSubscriber = this.eventManager.subscribe('servicoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
