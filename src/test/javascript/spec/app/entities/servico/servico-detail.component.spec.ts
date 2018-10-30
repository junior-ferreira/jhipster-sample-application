/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjetoeasoftwareTestModule } from '../../../test.module';
import { ServicoDetailComponent } from 'app/entities/servico/servico-detail.component';
import { Servico } from 'app/shared/model/servico.model';

describe('Component Tests', () => {
    describe('Servico Management Detail Component', () => {
        let comp: ServicoDetailComponent;
        let fixture: ComponentFixture<ServicoDetailComponent>;
        const route = ({ data: of({ servico: new Servico(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjetoeasoftwareTestModule],
                declarations: [ServicoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ServicoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ServicoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.servico).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
