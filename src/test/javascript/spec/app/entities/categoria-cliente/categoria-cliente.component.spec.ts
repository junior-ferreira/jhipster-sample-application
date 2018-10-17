/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { CategoriaClienteComponent } from 'app/entities/categoria-cliente/categoria-cliente.component';
import { CategoriaClienteService } from 'app/entities/categoria-cliente/categoria-cliente.service';
import { CategoriaCliente } from 'app/shared/model/categoria-cliente.model';

describe('Component Tests', () => {
    describe('CategoriaCliente Management Component', () => {
        let comp: CategoriaClienteComponent;
        let fixture: ComponentFixture<CategoriaClienteComponent>;
        let service: CategoriaClienteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [CategoriaClienteComponent],
                providers: []
            })
                .overrideTemplate(CategoriaClienteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoriaClienteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoriaClienteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CategoriaCliente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.categoriaClientes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
