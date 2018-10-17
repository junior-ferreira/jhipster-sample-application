import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from './pagamento.service';
import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from 'app/entities/fatura';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-pagamento-update',
    templateUrl: './pagamento-update.component.html'
})
export class PagamentoUpdateComponent implements OnInit {
    pagamento: IPagamento;
    isSaving: boolean;

    faturas: IFatura[];

    clientes: ICliente[];
    dataPagamentoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pagamentoService: PagamentoService,
        private faturaService: FaturaService,
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pagamento }) => {
            this.pagamento = pagamento;
        });
        this.faturaService.query({ filter: 'pagamento-is-null' }).subscribe(
            (res: HttpResponse<IFatura[]>) => {
                if (!this.pagamento.fatura || !this.pagamento.fatura.id) {
                    this.faturas = res.body;
                } else {
                    this.faturaService.find(this.pagamento.fatura.id).subscribe(
                        (subRes: HttpResponse<IFatura>) => {
                            this.faturas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clienteService.query({ filter: 'pagamento-is-null' }).subscribe(
            (res: HttpResponse<ICliente[]>) => {
                if (!this.pagamento.cliente || !this.pagamento.cliente.id) {
                    this.clientes = res.body;
                } else {
                    this.clienteService.find(this.pagamento.cliente.id).subscribe(
                        (subRes: HttpResponse<ICliente>) => {
                            this.clientes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pagamento.id !== undefined) {
            this.subscribeToSaveResponse(this.pagamentoService.update(this.pagamento));
        } else {
            this.subscribeToSaveResponse(this.pagamentoService.create(this.pagamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPagamento>>) {
        result.subscribe((res: HttpResponse<IPagamento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFaturaById(index: number, item: IFatura) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
