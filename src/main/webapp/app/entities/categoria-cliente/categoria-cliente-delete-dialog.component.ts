import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriaCliente } from 'app/shared/model/categoria-cliente.model';
import { CategoriaClienteService } from './categoria-cliente.service';

@Component({
    selector: 'jhi-categoria-cliente-delete-dialog',
    templateUrl: './categoria-cliente-delete-dialog.component.html'
})
export class CategoriaClienteDeleteDialogComponent {
    categoriaCliente: ICategoriaCliente;

    constructor(
        private categoriaClienteService: CategoriaClienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaClienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoriaClienteListModification',
                content: 'Deleted an categoriaCliente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoria-cliente-delete-popup',
    template: ''
})
export class CategoriaClienteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriaCliente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoriaClienteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categoriaCliente = categoriaCliente;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
