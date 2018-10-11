/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { CategoriaClienteDetailComponent } from 'app/entities/categoria-cliente/categoria-cliente-detail.component';
import { CategoriaCliente } from 'app/shared/model/categoria-cliente.model';

describe('Component Tests', () => {
    describe('CategoriaCliente Management Detail Component', () => {
        let comp: CategoriaClienteDetailComponent;
        let fixture: ComponentFixture<CategoriaClienteDetailComponent>;
        const route = ({ data: of({ categoriaCliente: new CategoriaCliente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [CategoriaClienteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoriaClienteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriaClienteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categoriaCliente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
