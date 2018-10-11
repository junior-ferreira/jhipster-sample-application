/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { FaturaDeleteDialogComponent } from 'app/entities/fatura/fatura-delete-dialog.component';
import { FaturaService } from 'app/entities/fatura/fatura.service';

describe('Component Tests', () => {
    describe('Fatura Management Delete Component', () => {
        let comp: FaturaDeleteDialogComponent;
        let fixture: ComponentFixture<FaturaDeleteDialogComponent>;
        let service: FaturaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [FaturaDeleteDialogComponent]
            })
                .overrideTemplate(FaturaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FaturaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaturaService);
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
