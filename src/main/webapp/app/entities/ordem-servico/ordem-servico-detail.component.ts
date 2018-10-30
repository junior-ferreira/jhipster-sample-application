import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrdemServico } from 'app/shared/model/ordem-servico.model';

@Component({
    selector: 'jhi-ordem-servico-detail',
    templateUrl: './ordem-servico-detail.component.html'
})
export class OrdemServicoDetailComponent implements OnInit {
    ordemServico: IOrdemServico;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordemServico }) => {
            this.ordemServico = ordemServico;
        });
    }

    previousState() {
        window.history.back();
    }
}
