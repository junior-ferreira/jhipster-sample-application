/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { OrdemServicoDeleteDialogComponent } from 'app/entities/ordem-servico/ordem-servico-delete-dialog.component';
import { OrdemServicoService } from 'app/entities/ordem-servico/ordem-servico.service';

describe('Component Tests', () => {
    describe('OrdemServico Management Delete Component', () => {
        let comp: OrdemServicoDeleteDialogComponent;
        let fixture: ComponentFixture<OrdemServicoDeleteDialogComponent>;
        let service: OrdemServicoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [OrdemServicoDeleteDialogComponent]
            })
                .overrideTemplate(OrdemServicoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrdemServicoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdemServicoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
