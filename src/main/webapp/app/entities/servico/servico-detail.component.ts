import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServico } from 'app/shared/model/servico.model';

@Component({
    selector: 'jhi-servico-detail',
    templateUrl: './servico-detail.component.html'
})
export class ServicoDetailComponent implements OnInit {
    servico: IServico;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ servico }) => {
            this.servico = servico;
        });
    }

    previousState() {
        window.history.back();
    }
}
