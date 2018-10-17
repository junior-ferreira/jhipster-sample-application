import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';

@Component({
    selector: 'jhi-categoria-cliente-detail',
    templateUrl: './categoria-cliente-detail.component.html'
})
export class CategoriaClienteDetailComponent implements OnInit {
    categoriaCliente: ICategoriaCliente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriaCliente }) => {
            this.categoriaCliente = categoriaCliente;
        });
    }

    previousState() {
        window.history.back();
    }
}
