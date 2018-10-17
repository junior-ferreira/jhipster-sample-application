import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';
import { CategoriaClienteService } from './categoria-cliente.service';

@Component({
    selector: 'jhi-categoria-cliente-update',
    templateUrl: './categoria-cliente-update.component.html'
})
export class CategoriaClienteUpdateComponent implements OnInit {
    categoriaCliente: ICategoriaCliente;
    isSaving: boolean;

    constructor(private categoriaClienteService: CategoriaClienteService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categoriaCliente }) => {
            this.categoriaCliente = categoriaCliente;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categoriaCliente.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriaClienteService.update(this.categoriaCliente));
        } else {
            this.subscribeToSaveResponse(this.categoriaClienteService.create(this.categoriaCliente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriaCliente>>) {
        result.subscribe((res: HttpResponse<ICategoriaCliente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
