import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrdemServico } from 'app/shared/model/ordem-servico.model';
import { Principal } from 'app/core';
import { OrdemServicoService } from './ordem-servico.service';

@Component({
    selector: 'jhi-ordem-servico',
    templateUrl: './ordem-servico.component.html'
})
export class OrdemServicoComponent implements OnInit, OnDestroy {
    ordemServicos: IOrdemServico[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ordemServicoService: OrdemServicoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ordemServicoService.query().subscribe(
            (res: HttpResponse<IOrdemServico[]>) => {
                this.ordemServicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdemServicos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrdemServico) {
        return item.id;
    }

    registerChangeInOrdemServicos() {
        this.eventSubscriber = this.eventManager.subscribe('ordemServicoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
