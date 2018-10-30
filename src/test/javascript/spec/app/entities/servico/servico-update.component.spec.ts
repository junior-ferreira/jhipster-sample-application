/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { ServicoUpdateComponent } from 'app/entities/servico/servico-update.component';
import { ServicoService } from 'app/entities/servico/servico.service';
import { Servico } from 'app/shared/model/servico.model';

describe('Component Tests', () => {
    describe('Servico Management Update Component', () => {
        let comp: ServicoUpdateComponent;
        let fixture: ComponentFixture<ServicoUpdateComponent>;
        let service: ServicoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [ServicoUpdateComponent]
            })
                .overrideTemplate(ServicoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ServicoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Servico(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.servico = entity;
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
                    const entity = new Servico();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.servico = entity;
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
