import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IProduto } from 'app/shared/model/produto.model';
import { ProdutoService } from './produto.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco';
import { IFatura } from 'app/shared/model/fatura.model';
import { FaturaService } from 'app/entities/fatura';

@Component({
    selector: 'jhi-produto-update',
    templateUrl: './produto-update.component.html'
})
export class ProdutoUpdateComponent implements OnInit {
    produto: IProduto;
    isSaving: boolean;

    enderecos: IEndereco[];

    faturas: IFatura[];
    dataCompraDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private produtoService: ProdutoService,
        private enderecoService: EnderecoService,
        private faturaService: FaturaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ produto }) => {
            this.produto = produto;
        });
        this.enderecoService.query({ filter: 'produto-is-null' }).subscribe(
            (res: HttpResponse<IEndereco[]>) => {
                if (!this.produto.endereco || !this.produto.endereco.id) {
                    this.enderecos = res.body;
                } else {
                    this.enderecoService.find(this.produto.endereco.id).subscribe(
                        (subRes: HttpResponse<IEndereco>) => {
                            this.enderecos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.faturaService.query().subscribe(
            (res: HttpResponse<IFatura[]>) => {
                this.faturas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.produto.id !== undefined) {
            this.subscribeToSaveResponse(this.produtoService.update(this.produto));
        } else {
            this.subscribeToSaveResponse(this.produtoService.create(this.produto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProduto>>) {
        result.subscribe((res: HttpResponse<IProduto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEnderecoById(index: number, item: IEndereco) {
        return item.id;
    }

    trackFaturaById(index: number, item: IFatura) {
        return item.id;
    }
}
