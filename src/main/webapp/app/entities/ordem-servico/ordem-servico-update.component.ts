import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IOrdemServico } from 'app/shared/model/ordem-servico.model';
import { OrdemServicoService } from './ordem-servico.service';
import { IServico } from 'app/shared/model/servico.model';
import { ServicoService } from 'app/entities/servico';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-ordem-servico-update',
    templateUrl: './ordem-servico-update.component.html'
})
export class OrdemServicoUpdateComponent implements OnInit {
    ordemServico: IOrdemServico;
    isSaving: boolean;

    servicos: IServico[];

    clientes: ICliente[];
    dataProcessamentoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ordemServicoService: OrdemServicoService,
        private servicoService: ServicoService,
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ordemServico }) => {
            this.ordemServico = ordemServico;
        });
        this.servicoService.query().subscribe(
            (res: HttpResponse<IServico[]>) => {
                this.servicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ordemServico.id !== undefined) {
            this.subscribeToSaveResponse(this.ordemServicoService.update(this.ordemServico));
        } else {
            this.subscribeToSaveResponse(this.ordemServicoService.create(this.ordemServico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrdemServico>>) {
        result.subscribe((res: HttpResponse<IOrdemServico>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackServicoById(index: number, item: IServico) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
