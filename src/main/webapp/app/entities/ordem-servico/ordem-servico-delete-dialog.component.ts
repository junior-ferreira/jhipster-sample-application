import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrdemServico } from 'app/shared/model/ordem-servico.model';
import { OrdemServicoService } from './ordem-servico.service';

@Component({
    selector: 'jhi-ordem-servico-delete-dialog',
    templateUrl: './ordem-servico-delete-dialog.component.html'
})
export class OrdemServicoDeleteDialogComponent {
    ordemServico: IOrdemServico;

    constructor(
        private ordemServicoService: OrdemServicoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordemServicoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ordemServicoListModification',
                content: 'Deleted an ordemServico'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ordem-servico-delete-popup',
    template: ''
})
export class OrdemServicoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ordemServico }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrdemServicoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ordemServico = ordemServico;
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
