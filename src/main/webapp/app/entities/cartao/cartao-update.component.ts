import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ICartao } from 'app/shared/model/cartao.model';
import { CartaoService } from './cartao.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-cartao-update',
    templateUrl: './cartao-update.component.html'
})
export class CartaoUpdateComponent implements OnInit {
    cartao: ICartao;
    isSaving: boolean;

    clientes: ICliente[];
    dataValidadeDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private cartaoService: CartaoService,
        private clienteService: ClienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cartao }) => {
            this.cartao = cartao;
        });
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
        if (this.cartao.id !== undefined) {
            this.subscribeToSaveResponse(this.cartaoService.update(this.cartao));
        } else {
            this.subscribeToSaveResponse(this.cartaoService.create(this.cartao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICartao>>) {
        result.subscribe((res: HttpResponse<ICartao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
