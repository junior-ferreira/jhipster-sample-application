import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IServico } from 'app/shared/model/servico.model';
import { ServicoService } from './servico.service';

@Component({
    selector: 'jhi-servico-update',
    templateUrl: './servico-update.component.html'
})
export class ServicoUpdateComponent implements OnInit {
    servico: IServico;
    isSaving: boolean;

    constructor(private servicoService: ServicoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ servico }) => {
            this.servico = servico;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.servico.id !== undefined) {
            this.subscribeToSaveResponse(this.servicoService.update(this.servico));
        } else {
            this.subscribeToSaveResponse(this.servicoService.create(this.servico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IServico>>) {
        result.subscribe((res: HttpResponse<IServico>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
