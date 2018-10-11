import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICartao } from 'app/shared/model/cartao.model';

@Component({
    selector: 'jhi-cartao-detail',
    templateUrl: './cartao-detail.component.html'
})
export class CartaoDetailComponent implements OnInit {
    cartao: ICartao;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cartao }) => {
            this.cartao = cartao;
        });
    }

    previousState() {
        window.history.back();
    }
}
