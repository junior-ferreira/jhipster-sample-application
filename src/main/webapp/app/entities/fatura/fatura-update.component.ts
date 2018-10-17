import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from './fatura.service';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { ICartao } from 'app/shared/model/cartao.model';
import { CartaoService } from 'app/entities/cartao';

@Component({
    selector: 'jhi-fatura-update',
    templateUrl: './fatura-update.component.html'
})
export class FaturaUpdateComponent implements OnInit {
    fatura: IFatura;
    isSaving: boolean;

    pagamentos: IPagamento[];

    clientes: ICliente[];

    cartaos: ICartao[];
    dataProcessamentoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private faturaService: FaturaService,
        private pagamentoService: PagamentoService,
        private clienteService: ClienteService,
        private cartaoService: CartaoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fatura }) => {
            this.fatura = fatura;
        });
        this.pagamentoService.query().subscribe(
            (res: HttpResponse<IPagamento[]>) => {
                this.pagamentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cartaoService.query().subscribe(
            (res: HttpResponse<ICartao[]>) => {
                this.cartaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fatura.id !== undefined) {
            this.subscribeToSaveResponse(this.faturaService.update(this.fatura));
        } else {
            this.subscribeToSaveResponse(this.faturaService.create(this.fatura));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFatura>>) {
        result.subscribe((res: HttpResponse<IFatura>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPagamentoById(index: number, item: IPagamento) {
        return item.id;
    }

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }

    trackCartaoById(index: number, item: ICartao) {
        return item.id;
    }
}
