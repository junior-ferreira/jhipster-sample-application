/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { OrdemServicoUpdateComponent } from 'app/entities/ordem-servico/ordem-servico-update.component';
import { OrdemServicoService } from 'app/entities/ordem-servico/ordem-servico.service';
import { OrdemServico } from 'app/shared/model/ordem-servico.model';

describe('Component Tests', () => {
    describe('OrdemServico Management Update Component', () => {
        let comp: OrdemServicoUpdateComponent;
        let fixture: ComponentFixture<OrdemServicoUpdateComponent>;
        let service: OrdemServicoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [OrdemServicoUpdateComponent]
            })
                .overrideTemplate(OrdemServicoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrdemServicoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdemServicoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrdemServico(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ordemServico = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrdemServico();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ordemServico = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
