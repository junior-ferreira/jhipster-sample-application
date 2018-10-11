/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { CategoriaClienteUpdateComponent } from 'app/entities/categoria-cliente/categoria-cliente-update.component';
import { CategoriaClienteService } from 'app/entities/categoria-cliente/categoria-cliente.service';
import { CategoriaCliente } from 'app/shared/model/categoria-cliente.model';

describe('Component Tests', () => {
    describe('CategoriaCliente Management Update Component', () => {
        let comp: CategoriaClienteUpdateComponent;
        let fixture: ComponentFixture<CategoriaClienteUpdateComponent>;
        let service: CategoriaClienteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [CategoriaClienteUpdateComponent]
            })
                .overrideTemplate(CategoriaClienteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriaClienteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaClienteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CategoriaCliente(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.categoriaCliente = entity;
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
                    const entity = new CategoriaCliente();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.categoriaCliente = entity;
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
