import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from 'app/entities/fatura';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { PagamentoService } from 'app/entities/pagamento';
import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';
import { CategoriaClienteService } from 'app/entities/categoria-cliente';

@Component({
    selector: 'jhi-cliente-update',
    templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
    cliente: ICliente;
    isSaving: boolean;

    faturas: IFatura[];

    pagamentos: IPagamento[];

    categoriaclientes: ICategoriaCliente[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private clienteService: ClienteService,
        private faturaService: FaturaService,
        private pagamentoService: PagamentoService,
        private categoriaClienteService: CategoriaClienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cliente }) => {
            this.cliente = cliente;
        });
        this.faturaService.query({ filter: 'cliente-is-null' }).subscribe(
            (res: HttpResponse<IFatura[]>) => {
                if (!this.cliente.fatura || !this.cliente.fatura.id) {
                    this.faturas = res.body;
                } else {
                    this.faturaService.find(this.cliente.fatura.id).subscribe(
                        (subRes: HttpResponse<IFatura>) => {
                            this.faturas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pagamentoService.query().subscribe(
            (res: HttpResponse<IPagamento[]>) => {
                this.pagamentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.categoriaClienteService.query().subscribe(
            (res: HttpResponse<ICategoriaCliente[]>) => {
                this.categoriaclientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.subscribeToSaveResponse(this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveResponse(this.clienteService.create(this.cliente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
        result.subscribe((res: HttpResponse<ICliente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPagamentoById(index: number, item: IPagamento) {
        return item.id;
    }

    trackCategoriaClienteById(index: number, item: ICategoriaCliente) {
        return item.id;
    }
}
